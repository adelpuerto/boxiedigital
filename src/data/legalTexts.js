// REEMPLAZA LOS DATOS ENTRE CORCHETES [ ] CON TU INFORMACIÓN REAL

const COMPANY_NAME = "[NOMBRE COMPLETO O RAZÓN SOCIAL]";
const CUIT = "[TU CUIT]";
const ADDRESS = "[DIRECCIÓN FISCAL COMPLETA]";
const EMAIL = "hola@boxie.com.ar";

export const termsText = `
<h3>1. Introducción</h3>
<p>Bienvenido a Boxie. Al acceder a nuestro sitio web y utilizar nuestros servicios, aceptás cumplir con estos Términos y Condiciones. Este servicio es operado por <strong>${COMPANY_NAME}</strong>, CUIT <strong>${CUIT}</strong>, con domicilio legal en <strong>${ADDRESS}</strong>.</p>

<h3>2. Descripción del Servicio</h3>
<p>Boxie ofrece una plataforma para la creación de experiencias digitales personalizadas ("Boxies"). El usuario proporciona contenido (fotos, textos, música) que nosotros procesamos y alojamos en una dirección web única para ser compartida como regalo.</p>

<h3>3. Personalización y Bloqueo</h3>
<p>El usuario entiende que Boxie es un producto <strong>personalizado</strong>. Una vez realizada la compra, el usuario recibe un acceso para editar el contenido. Al finalizar la edición y presionar el botón de "Bloquear / Regalar", el contenido se considera final y entregado. No se podrán realizar modificaciones posteriores.</p>

<h3>4. Excepción al Derecho de Retracto (Arrepentimiento)</h3>
<p>Conforme al <strong>Artículo 1116 del Código Civil y Comercial de la Nación Argentina</strong>, el derecho de retracto no es aplicable a contratos referidos a:</p>
<ul>
    <li>Productos confeccionados conforme a las especificaciones suministradas por el consumidor o claramente personalizados.</li>
    <li>Suministro de contenido digital que no se preste en un soporte material cuando la ejecución haya comenzado.</li>
</ul>
<p>Por lo tanto, <strong>una vez que el usuario ha accedido a la plataforma de edición o ha "Bloqueado" su Boxie, no se aceptarán devoluciones ni reembolsos</strong>, dado que el servicio se considera ejecutado y personalizado.</p>

<h3>5. Vigencia del Servicio</h3>
<p>Las Boxies creadas tendrán una vigencia online de <strong>60 (sesenta) días corridos</strong> desde la fecha de creación. Pasado ese lapso, Boxie se reserva el derecho de eliminar el contenido de sus servidores para garantizar la privacidad y optimización del espacio.</p>

<h3>6. Responsabilidad del Contenido</h3>
<p>El usuario es el único responsable del contenido (imágenes, textos) que sube a Boxie. Queda prohibido subir contenido ilegal, pornográfico, violento u ofensivo. Boxie se reserva el derecho de eliminar cualquier cuenta o Boxie que viole estas normas sin derecho a reembolso.</p>

<h3>7. Ley Aplicable y Jurisdicción</h3>
<p>Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa será resuelta en los Tribunales Ordinarios de <strong>[TU CIUDAD/JURISDICCIÓN]</strong>.</p>
`;

export const privacyText = `
<h3>1. Responsable de los Datos</h3>
<p>Tus datos personales son tratados por <strong>${COMPANY_NAME}</strong> ("Boxie") en cumplimiento de la Ley N° 25.326 de Protección de Datos Personales.</p>

<h3>2. Qué datos recolectamos</h3>
<p>Recolectamos únicamente los datos necesarios para brindar el servicio: nombre, correo electrónico, teléfono y el contenido multimedia que subís voluntariamente para crear tu regalo.</p>

<h3>3. Uso de la Información</h3>
<p>Tus datos se utilizan exclusivamente para:</p>
<ul>
    <li>Procesar tu pedido y enviarte los accesos de edición.</li>
    <li>Alojar tu Boxie para que pueda ser vista por el destinatario.</li>
    <li>Enviarte notificaciones relacionadas con el estado de tu servicio.</li>
</ul>
<p><strong>Boxie no vende ni comparte tus datos con terceros para fines publicitarios.</strong></p>

<h3>4. Privacidad de las Fotos</h3>
<p>Entendemos que el contenido de una Boxie es íntimo. Las fotos y textos subidos son privados y solo accesibles a través del link único que se genera. Boxie no utiliza tus fotos personales para publicidad sin tu consentimiento expreso.</p>

<h3>5. Tus Derechos</h3>
<p>Tenés derecho a acceder, rectificar o suprimir tus datos personales. Para ejercer estos derechos, enviá un correo a <strong>${EMAIL}</strong>.</p>
`;

export const paymentsText = `
<h3>1. Medios de Pago</h3>
<p>Los pagos son procesados de forma segura a través de <strong>Mercado Pago</strong>. Aceptamos tarjetas de crédito, débito y dinero en cuenta de Mercado Pago. Boxie no almacena datos de tarjetas de crédito.</p>

<h3>2. Facturación</h3>
<p>Se emitirá una factura electrónica tipo "C" (Consumidor Final) por cada compra, que será enviada al correo electrónico registrado.</p>

<h3>3. Política de Reembolsos</h3>
<p>Debido a la naturaleza personalizada del producto (ver Términos y Condiciones), solo se realizarán reembolsos en los siguientes casos:</p>
<ul>
    <li>Fallas técnicas imputables a Boxie que impidan el uso del servicio y no puedan ser resueltas en 48 horas.</li>
    <li>Compras duplicadas por error del sistema.</li>
</ul>
<p>No se realizan reembolsos por "arrepentimiento" una vez que se ha comenzado a utilizar el editor o se ha enviado el regalo, amparados en el Art. 1116 del CCCN.</p>
`;

export const ipText = `
<h3>1. Marca Registrada</h3>
<p>El nombre "Boxie", su logotipo y diseño del sitio web son propiedad intelectual de <strong>${COMPANY_NAME}</strong>. Queda prohibida su reproducción total o parcial sin autorización.</p>

<h3>2. Contenido de Terceros</h3>
<p>El usuario garantiza que posee los derechos sobre las imágenes y textos que sube a la plataforma. Boxie actúa como mero intermediario de alojamiento y no se hace responsable por infracciones de derechos de autor cometidas por los usuarios al subir contenido protegido.</p>
`;