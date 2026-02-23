// server.js (Versión depurada)
import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN 
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// TUS CUPONES
const AVAILABLE_COUPONS = {
    "BOXIE10": 10,       
    "PAREJA20": 20,      
    "INFLUENCER50": 50,  
    "LOQUIEROYA25": 50, 
    "PROMO35": 35        
};

app.get("/", (req, res) => res.send("Server Boxie OK"));

// VALIDAR CUPÓN
app.post("/validate_coupon", (req, res) => {
    const { coupon } = req.body;
    // Evitamos error si no mandan cupón
    if (!coupon) return res.json({ valid: false });

    const discount = AVAILABLE_COUPONS[coupon.toUpperCase()];

    if (discount) {
        res.json({ valid: true, discountPercent: discount });
    } else {
        res.json({ valid: false, message: "Cupón no válido" });
    }
});

// CREAR PREFERENCIA DE PAGO
app.post("/create_preference", async (req, res) => {
    try {
        const { title, price, quantity, coupon } = req.body;
        
        let finalPrice = Number(price);
        let titleSuffix = "";

        // Lógica de Descuento
        if (coupon && AVAILABLE_COUPONS[coupon.toUpperCase()]) {
            const discountPercent = AVAILABLE_COUPONS[coupon.toUpperCase()];
            const discountAmount = (finalPrice * discountPercent) / 100;
            finalPrice = finalPrice - discountAmount;
            titleSuffix = ` (Desc. ${discountPercent}%)`;
            console.log(`Aplicando cupón ${coupon}: Precio final ${finalPrice}`);
        }

        // --- OBJETO DE PREFERENCIA ---
       const body = {
            items: [
                {
                    title: title + titleSuffix,
                    quantity: Number(quantity),
                    unit_price: finalPrice,
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "http://127.0.0.1:5173/success",
                failure: "http://127.0.0.1:5173/checkout",
                pending: "http://127.0.0.1:5173/checkout",
            },
            // auto_return: "approved",  <--- ¡COMENTA O BORRA ESTA LÍNEA!
        };

        // Debug: Mostrar en consola qué estamos enviando (por si falla)
        console.log("Enviando a MP:", JSON.stringify(body, null, 2));

        const preference = new Preference(client);
        const result = await preference.create({ body });
        
        res.json({ id: result.id });

    } catch (error) {
        console.error("Error MP Detallado:", error);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});

app.listen(port, () => {
    console.log(`Server corriendo en puerto ${port}`);
});