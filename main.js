var token = 'BOT_TOKEN';
var telegramUrl = 'https://api.telegram.org/bot' + token;
var spreadsheetId = 'ADMIN SPREADSHEET';
var administradores = ['IDS FOR ADMIN ACCES'];
var contacto_asesor = '@asesor'
var grupos_id = ['IDS DE LOS GRUPOS A USAR']

// VERIFICACION
var spreadsheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('forms_registro');
var spreadsheet_2 = SpreadsheetApp.openById(spreadsheetId).getSheetByName('info');

//// ADMIN: ABRIENDO HOJAS DE SHEETS
var sheets_admin = SpreadsheetApp.openById(spreadsheetId).getSheetByName('admin');
var range_admin = sheets_admin.getDataRange();
var values_admin = range_admin.getValues();
var stake10n1 = values_admin[9][1];
var stake10n2 = values_admin[10][1];
var stake10combo = values_admin[11][1];
var promo_peru = values_admin[6][1];

//GRUPO VIP
var grupo_vip= SpreadsheetApp.openById(spreadsheetId).getSheetByName('grupo_vip');

//STAKE10
var stake10_1 = SpreadsheetApp.openById(spreadsheetId).getSheetByName('stake10-I');
var stake10_2 = SpreadsheetApp.openById(spreadsheetId).getSheetByName('stake10-II');
var stake10_combo= SpreadsheetApp.openById(spreadsheetId).getSheetByName('stake10-combo');

//AMERICAN PICKS
var grupo_american = SpreadsheetApp.openById(spreadsheetId).getSheetByName('grupo_american');


//PARA VEFICACION
var spreadsheet_5 = SpreadsheetApp.openById(spreadsheetId).getSheetByName('ids');
var range_5 = spreadsheet_5.getDataRange();
var values_5 = range_5.getValues();


//INFORMACION DE PAGO
var promo_peru1 = 'https://imgur.com/7pzNpgO';
var promo_peru2 = 'https://imgur.com/wkvzziJ';
var info_pago_foto = 'https://i.imgur.com/BqENBgr.jpeg';
var regreso_menu = 'Para regresar al menú, escribe MENU';
var info_pago_text = 'Realiza tu pago a las siguentes cuentas y envíame una captura de pantalla para añadirte al grupo ⤵️ ';
var descripcion_pago = 'Para una aprobación más rápida, por favor especifica el paquete adquirido en la descripción de la imagen y/o transferencia bancaria 👨‍💻'


//MENU CON PROMOCION
if(promo_peru == 'Si'){
  var menu = '<b>0. </b>  PROMO - Hoy Juega Perú 🇵🇪 \n<b>1. </b>  Aprende a apostar 💡 \n<b>2. </b>  Paquetes Premium 👑 \n<b>3. </b>  Info STAKE10 🔮 \n<b>4. </b>  Mi ID 🔒 \n<b>5. </b>  Valida tu transacción 🗂️ \n<b>6. </b>  Estado de mi membresía ✅ \n<b>7. </b>  Grupo Gratuito 🔥 \n<b>8. </b>  Renueva tu suscripción 📌 \n<b>9. </b>  Manejo de BANK 💰 \n<b>10. </b> Registro Casa de Apuestas 🏦 \n<b>11.</b>  Contáctate con un asesor 👨🏻‍🦰';
}
else {
  var menu =  '<b>1. </b>  Aprende a apostar 💡 \n<b>2. </b>  Paquetes Premium 👑 \n<b>3. </b>  Info STAKE10 🔮 \n<b>4. </b>  Mi ID 🔒 \n<b>5. </b>  Valida tu transacción 🗂️ \n<b>6. </b>  Estado de mi membresía ✅ \n<b>7. </b>  Grupo Gratuito 🔥 \n<b>8. </b>  Renueva tu suscripción 📌 \n<b>9. </b>  Manejo de BANK 💰 \n<b>10. </b> Registro Casa de Apuestas 🏦 \n<b>11.</b>  Contáctate con un asesor 👨🏻‍🦰';
}

// ELIMINAR TECLADO AL ACEPTAR EL PAGO
function deletekeyboard(a,b){
  var url = UrlFetchApp.fetch(telegramUrl + '/deleteMessage?chat_id='+a + '&message_id='+b)
  return UrlFetchApp.fetch(url)
}

// ENVIAR FOTO
function enviar_foto(chat_id, photo, caption){
  var url = telegramUrl + '/sendPhoto?chat_id='+chat_id + '&photo='+photo + '&caption=' + caption;
  return UrlFetchApp.fetch(url);
}

// ENVIAR FOTO (SIN CAPTION)
function enviar_foto_sin_caption(chat_id, photo){
  var url = telegramUrl + '/sendPhoto?chat_id='+chat_id + '&photo='+photo;
  return UrlFetchApp.fetch(url);
}

// SUMA
function suma(lista = []){
  sum = 0
  for(i=0;i<lista.length;i++){
    sum = sum + lista[i];
  }
  return sum
}

// GET
function doGet(e) {
  return HtmlService.createHtmlOutput('Funcionando');
}

// ELIMINAR MIEMBROS
function deletemember(chat_id, user_id) {
  try{
      var url = telegramUrl + '/banChatMember?chat_id=' + chat_id + '&user_id=' + user_id;
    UrlFetchApp.fetch(url);
  }catch{
    console.log("ERROR")
  }
}

// DESBANEAR MIEMBROS
function unbanchatmember(chat_id,user_id){
  try{
    var url = telegramUrl + '/unbanChatMember?chat_id=' + chat_id + '&user_id=' + user_id;
    UrlFetchApp.fetch(url);
  }catch{
    //pass
  }
}

// REENVIAR PAGOS A ADMIN
function reenviar(receptor,emisor,id_me){
  var url3 = telegramUrl + '/forwardMessage?chat_id='+receptor+'&from_chat_id='+ emisor +'&message_id='+id_me;
  UrlFetchApp.fetch(url3);
}

// CREAR LINK DE GRUPO Y ENVIARLO AL USUARIO INSCRITO
function sendText_link() {
  function ultimoValor_id(){ 
    let ultimafila = spreadsheet.getLastRow();
    var ultimo_id = spreadsheet.getRange(ultimafila,11).getValue();
    console.log(ultimo_id);
    return ultimo_id
  }
  function ultimovalorgrupo(){
    let ultimafila = spreadsheet.getLastRow();
    var ultimo_valor_grupo = spreadsheet.getRange(ultimafila,15).getValue();
    console.log(ultimo_valor_grupo)
    return ultimo_valor_grupo
  }
  function create_chat_link_only(chat_id_llegado){
    chat_id = chat_id_llegado;
    max_use=1
    expirar=Math.round(Date.now()/1000)+100000; //link con vencimiento
    console.log(expirar)
    var url = UrlFetchApp.fetch(telegramUrl + '/createChatInviteLink?chat_id=' + chat_id +'&member_limit='+max_use+'&expire_date='+ expirar);
    var data = JSON.parse(url.getContentText());
    link = encodeURIComponent(data.result["invite_link"]);
    return link
  }
  let id= ultimoValor_id();
  let grupo_identificador=ultimovalorgrupo();
  console.log(grupo_identificador)
  if(grupo_identificador == '1' ){ 
    //Grupo VIP
    let group= '-1001698238661';
    let verificador=0;
    let user=0;
    for(i=0;i<values_5.length;i++){
      if (values_5[i][1] == id){
        var answer = create_chat_link_only(group);
        sendText(id, "Felicitaciones por tu registro, ahora puedes acceder al GRUPO VIP con este enlance");
        var url = telegramUrl + '/sendMessage?chat_id=' + id + '&text=' + answer;
        UrlFetchApp.fetch(url);
        verificador=1;
        spreadsheet_5.deleteRow(i+1)
        break;
        } 
    }
    if (verificador==0){
      sendText('1676794449', 'Hola, tu ID ingresado no es el correcto. Por favor, contactate con un asesor⤵️ ');
      sendText('1676794449',id);
    }
  }
  else if(grupo_identificador == '2'){
    //American Picks
    console.log(grupo_identificador)
    let group = '-1001488390333';
    for(i=0;i<values_5.length;i++){
    if (values_5[i][1] == id){
      var answer = create_chat_link_only(group);
      sendText(id, "Felicitaciones por tu registro, ahora puedes acceder al GRUPO AMERICAN PICKS con este enlance");
      var url = telegramUrl + '/sendMessage?chat_id=' + id + '&text=' + answer;
      UrlFetchApp.fetch(url);
      spreadsheet_5.deleteRow(i+1)
      break;
    }
  }
  }
  else if(grupo_identificador == '3'){
    let group = '-1001558134910';
    //Liga Peruana
    for(i=0;i<values_5.length;i++){
    if (values_5[i][1] == id){
      var answer = create_chat_link_only(group);
      sendText(id, "Felicitaciones por tu registro, ahora puedes acceder al GRUPO LIGA PERUANA con este enlance");
      var url = telegramUrl + '/sendMessage?chat_id=' + id + '&text=' + answer;
      UrlFetchApp.fetch(url);
      spreadsheet_5.deleteRow(i+1)
      break;
  }
    }
  }
  else if(grupo_identificador == '4'){
    let grupo_vip = '-1001698238661';
    let american_picks = '-1001488390333';
    for(i=0;i<values_5.length;i++){
    if (values_5[i][1] == id){
      var vip_link = create_chat_link_only(grupo_vip);
      var american_link = create_chat_link_only(american_picks);
      sendText(id, "Felicitaciones por tu registro, ahora puedes acceder al PAQUETE COMPLETO con este enlance");
      sendText(id,'Grupo American Picks 🇺🇸 ' + american_link);
      sendText(id,'Grupo Vip 🔱 ' + vip_link);
      spreadsheet_5.deleteRow(i+1)
      break;
  }
    }
  }
  else if (grupo_identificador == '7'){
    let group = '-1001567679015';
    //Combo Stake10
    for(i=0;i<values_5.length;i++){
    if (values_5[i][1] == id){
      var answer = create_chat_link_only(group);
      sendText(id, "Felicitaciones por tu registro, ahora puedes acceder al grupo con este enlance");
      var url = telegramUrl + '/sendMessage?chat_id=' + id + '&text=' + answer;
      UrlFetchApp.fetch(url);
      spreadsheet_5.deleteRow(i+1)
      sendText(id, "Recuerda buscar el grupo como STAKE10 COMBO si es que no lo encuentras")
      break;
      }
    }
  } else if (grupo_identificador == '5') {
    //PeruvianPicks Stake10 - II 🏆
    let group = '-1001539063486';
    for(i=0;i<values_5.length;i++){
    if (values_5[i][1] == id){
      var answer = create_chat_link_only(group);
      sendText(id, "Felicitaciones por tu registro, ahora puedes acceder al grupo con este enlance");
      var url = telegramUrl + '/sendMessage?chat_id=' + id + '&text=' + answer;
      UrlFetchApp.fetch(url);
      spreadsheet_5.deleteRow(i+1)
      sendText(id, "Recuerda buscar el grupo como Stake 10 - II si es que no lo encuentras")
      break;
      }
    }
  } else if (grupo_identificador == '6') {
    //PeruvianPicks Stake10 - I 🏆
    let group = '-1001695943834';
    for(i=0;i<values_5.length;i++){
    if (values_5[i][1] == id){
      var answer = create_chat_link_only(group);
      sendText(id, "Felicitaciones por tu registro, ahora puedes acceder al grupo con este enlance");
      var url = telegramUrl + '/sendMessage?chat_id=' + id + '&text=' + answer;
      UrlFetchApp.fetch(url);
      spreadsheet_5.deleteRow(i+1)
      sendText(id, "Recuerda buscar el grupo como Stake 10 - I si es que no lo encuentras")
      break;
      }
    }
  }
}

// MENU DE OPCIONES
function sendMenu(chatId, text, keyBoard) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyBoard)
    }
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}
// ELIMINAR MIEMBROS VENCIDOS DE TODOS LOS GRUPOS
function eliminar(){
  //VIP: -1001698238661
  //American: -1001488390333
  let grupos = ['-1001698238661', '-1001488390333']
  let range = spreadsheet.getDataRange();
  let values = range.getValues();
  for(i=0;i<values.length;i++){
    if (values[i][18] == "Vencido"){
      if(values[i][13]!=4){
        let idnt=values[i][13]
        console.log(i)
        deletemember(grupos[idnt-1],values[i][10])
        unbanchatmember(grupos[idnt-1],values[i][10])
      } else {
        deletemember(grupos[0],values[i][10])
        unbanchatmember(grupos[0],values[i][10])
        deletemember(grupos[1],values[i][10])
        unbanchatmember(grupos[1],values[i][10])
      }
    }
  }
}
// ELIMINAR MIEMBROS VENCIDOS STAKE10 - I
function eliminar_stake10_I(){
  var grupo_stake10 = SpreadsheetApp.openById(spreadsheetId).getSheetByName('stake10-I');
  let grupos = '-1001695943834';
  var range_stake_10 = grupo_stake10.getDataRange();
  var values_stake_10 = range_stake_10.getValues();
  var eliminados = 0;
  for(i=0;i<values_stake_10.length;i++){
    console.log(values_stake_10[i][1]);
    console.log(values_stake_10[i][2]);
    deletemember(grupos,values_stake_10[i][1]);
    unbanchatmember(grupos,values_stake_10[i][1]);
    eliminados = eliminados + 1;
    sendText('-1001603495278 ','Eliminado Stake10 - I'+ values_stake_10[i][3])
  }
  grupo_stake10.deleteRows(2,values_stake_10.length-1);
}

// ELIMINAR MIEMBROS VENCIDOS STAKE10 - II
function eliminar_stake10_II(){
  var grupo_stake10 = SpreadsheetApp.openById(spreadsheetId).getSheetByName('stake10-II');
  let grupos = '-1001539063486';
  var range_stake_10 = grupo_stake10.getDataRange();
  var values_stake_10 = range_stake_10.getValues();
  var eliminados = 0;
  for(i=0;i<values_stake_10.length;i++){
    console.log(values_stake_10[i][1]);
    console.log(values_stake_10[i][2]);
    deletemember(grupos,values_stake_10[i][1]);
    unbanchatmember(grupos,values_stake_10[i][1]);
    eliminados = eliminados + 1;
    sendText('-1001603495278 ','Eliminado Stake10 - II'+ values_stake_10[i][3])
  }
  grupo_stake10.deleteRows(2,values_stake_10.length-1);
}

// ELIMINAR MIEMBROS VENCIDOS STAKE10 - COMBO
function eliminar_stake10_combo(){
  var grupo_stake10 = SpreadsheetApp.openById(spreadsheetId).getSheetByName('stake10-combo');
  let grupos = '-1001567679015';
  let id = '1676794449';
  var range_stake_10 = grupo_stake10.getDataRange();
  var values_stake_10 = range_stake_10.getValues();
  var eliminados = 0;
  for(i=0;i<values_stake_10.length;i++){
    console.log(values_stake_10[i][1]);
    console.log(values_stake_10[i][2]);
    deletemember(grupos,values_stake_10[i][1]);
    unbanchatmember(grupos,values_stake_10[i][1]);
    eliminados = eliminados + 1;
    sendText('-1001603495278 ','Eliminado Stake10 - COMBO'+ values_stake_10[i][3])
  }
  grupo_stake10.deleteRows(2,values_stake_10.length-1);
}

// RECORDATORIO RENOVACION
function recordar(){
  let id = '1676794449';
  let id2= '394714808';
    let range = spreadsheet.getDataRange();
    let values = range.getValues();
    let notificados = 0;
    for (i=1; i < values.length; i++){
      if (values[i][18] == "Vencido" && values[i][21] == 'Stake 10'){
        try {
          notificados = notificados + 1 ;
          sendText(values[i][10], 'Hola ' + values[i][3] + ', tu membresía '+values[i][21] + ' actualmente se encuentra VENCIDA‼️ Pronto estaremos eliminado a los que no renueven 👀');
          sendText(values[i][10], 'Si deseas seguir recibiendo los mejores pronósticos, realiza tu renovación mandándome 7 ⤵️');
          sendText(values[i][10], menu);
        }
        catch(e) {
        }
                  
      }
    }
  sendText(id, '🔥 ' + notificados + ' personas 🔥'+ ' han sido notificadas.');
  sendText(id2, '🔥 ' + notificados + ' personas 🔥'+ ' han sido notificadas.');
}

// MANDAR MENSAJES
function sendText(chatId, text) {
  try{
    UrlFetchApp.fetch(telegramUrl + '/sendMessage?chat_id=' + chatId+ '&text=' + text);
  }catch{
  }
}

//ACTUALIZAR BB
function actualizacion(){
  function ultimoValor(){ 
    var ultimo_valor = spreadsheet.getRange(ultimafila,11).getValue();
  return ultimo_valor
  }
  function ultimovalorgrupo(){
    var ultimo_valor = spreadsheet.getRange(ultimafila,21).getValue();
    return ultimo_valor
  }
    let range = spreadsheet.getDataRange();
    let values = range.getValues();
    let ultimafila = spreadsheet.getLastRow();
    console.log(values[0][20])
    for(i=2;i<ultimafila;i++){
      if(ultimoValor()==values[i-1][10] && ultimovalorgrupo()==values[i-1][21]){
        if (values[i-1][17]<=0){
          spreadsheet.getRange(i,1).setValue(spreadsheet.getRange(ultimafila,1).getValue());
          spreadsheet.getRange(i,6).setValue(spreadsheet.getRange(ultimafila,6).getValue());
          spreadsheet.deleteRow(ultimafila);
          break;
        }else{
          spreadsheet.getRange(i,22).setValue(spreadsheet.getRange(i,17).getValue());
          spreadsheet.getRange(i,1).setValue(spreadsheet.getRange(ultimafila,1).getValue());
          spreadsheet.getRange(i,6).setValue(spreadsheet.getRange(ultimafila,6).getValue());
          spreadsheet.deleteRow(ultimafila);
          break;  
        }
        
      }
    }
}

// RECIBIR MENSAJES
function doPost(e) {
  var contents = JSON.parse(e.postData.contents);
  if (contents.callback_query) {
    var id_callback = contents.callback_query.from.id;
    let callback_messageid=contents.callback_query.message.message_id;
    var data = contents.callback_query.data;
    let numeros=data.split(" ");

    let usuario = numeros[1];
    let identificador = numeros[0];
    if (data == 'vip'){
      sendMenu(id_callback,'🥇 Grupo VIP');
      sendText(id_callback, 'En grupo VIP recibirás entre 3 y 5 apuestas de fútbol con un alto grado de confiabilidad. Este paquete incluye los principales eventos de este deporte, como Champions League, ligas europeas y sudamericanas, etc.');
      sendMenu(id_callback, '💵 50 soles por mes\n💵 80 soles trimestral\n💵 150 soles vitalicio ');
      sendText(id_callback,info_pago_text);
      sendText(id_callback, descripcion_pago);
      enviar_foto(id_callback,info_pago_foto,regreso_menu);
    }
    if (data == 'ap'){
      sendMenu(id_callback,'🇺🇸 American Picks');
      sendMenu(id_callback, 'El paquete consiste en un grupo 100% dedicado a los deportes americanos, entre estos nos enfocaremos en: \n🏀 Basketball\n⚾ Baseball\n🏈 Fútbol Americano');
      sendMenu(id_callback, '💵 40 soles por mes\n💵 70 soles trimestral');
      sendText(id_callback,info_pago_text);
      sendText(id_callback, descripcion_pago);
      enviar_foto(id_callback,info_pago_foto,regreso_menu);
    }
    if (data == 'lp'){
        sendMenu(id_callback,'🇵🇪 Liga peruana');
        sendText(id_callback, 'De 2 a 3 pronósticos diarios cada vez que hayan partidos de la liga 1 Betsson');
        sendMenu(id_callback, '💵 30 soles por mes\n💵 70 soles por todo el torneo de apertura');
        sendText(id_callback,info_pago_text);
        sendText(id_callback, descripcion_pago);
        enviar_foto(id_callback,info_pago_foto,regreso_menu);
    }
    if (data == 'pc'){
      sendMenu(id_callback,'💎 Paquete Completo');
      sendText(id_callback, 'Incluye todos nuestros paquetes');
      sendMenu(id_callback, '💵 Paquete completo mensual 80\n💵 Paquete completo trimestral 120\n💵 Completo vitalicio 210');
      sendText(id_callback,info_pago_text);
      sendText(id_callback, descripcion_pago);
      enviar_foto(id_callback,info_pago_foto,regreso_menu);
    }
    if (data == 'm'){
      sendMenu(id_callback, 'Escribe el número de la opción para conseguir información');
      sendMenu(id_callback,menu);
    }

    if (identificador == '1') {
      sendText(id_callback,"Aceptaste el pago" );    
      sendText(usuario,"🥳 Pago Aceptado 🥳" );
      sendText(usuario, "Felicitaciones, ahora ya formas parte del grupo con los mejores pronósticos del mercado");
      sendText(usuario, "Para unirte al grupo, primero regístrate aquí ⤵️ ");
      sendText(usuario, "https://forms.gle/ZQuSr429buZTQaJx6");
      sendText(usuario, "Guarda tu ID de Telegram para completar tu registro: " + usuario);
      sendText(usuario, "Te enviaremos el link de acceso al grupo donde pasamos los pronósticos cuando completes tu registro 🙌");
      
      if(values_admin[2][1] == 'Si' ){
        sendText(usuario, "*Solo si has adquirido algun STAKE10 ⤵️") ;
        sendText(usuario, "Si pagaste por " + stake10n1 + " , regístralo como STAKE10 Grupo 1");
        sendText(usuario, "Si pagaste por " + stake10n2 + " , regístralo como STAKE10 Grupo 2");
        sendText(usuario, "Si pagaste por " + String(stake10combo) + " , regístralo como STAKE10 COMBO");
      }

      spreadsheet_5.appendRow([new Date (),usuario]);
      deletekeyboard(id_callback,callback_messageid)

    } else if (identificador == '0') {
      sendText(id_callback,"Rechazaste el pago" );
      sendText(usuario,"😢 Pago Rechazado 😢" );
      sendText(usuario, "Tu pago ha sido rechazado.");
      deletekeyboard(id_callback,callback_messageid)
    }
    else if(data == 's1'){
      sendMenu(id_callback, 'El costo de ' + stake10n1 + ' GRUPO 1 es de 30 soles para miembros VIP y 35 soles para el resto');
      sendMenu(id_callback, info_pago_text);
      sendText(id_callback, descripcion_pago);
      enviar_foto(id_callback,info_pago_foto,regreso_menu);
      sendText(id_callback, 'Este es nuestro STAKE10 GRUPO 1');
    }
    else if(data == 's2'){
      sendMenu(id_callback, 'El costo de ' + stake10n2 + ' GRUPO 2 es de 30 soles para miembros VIP y 35 soles para el resto');
      sendMenu(id_callback, info_pago_text);
      sendText(id_callback, descripcion_pago);
      enviar_foto(id_callback,info_pago_foto,regreso_menu);
      sendText(id_callback, 'Este es nuestro STAKE10 GRUPO 2');

    }
    else if(data == 'combo'){
      sendMenu(id_callback, 'El costo de ' + stake10combo + ' GRUPO COMBO es de 45 soles para miembros VIP y 50 soles para el resto');
      sendMenu(id_callback, info_pago_text);
      sendText(id_callback, descripcion_pago);
      enviar_foto(id_callback,info_pago_foto,regreso_menu);
      sendText(id_callback, 'Este es nuestro STAKE10 GRUPO COMBO');
    }
  } else if(contents.message.new_chat_member){
    //STAKE10
     if(contents.message.chat.id =='-1001695943834'){
      sendText('-1001603495278',"Nuevo ingresante Stake 10 - I: " + contents.message.new_chat_member.first_name);
      stake10_1.appendRow([new Date (),contents.message.new_chat_member.id,contents.message.new_chat_member.first_name]);}
     else if(contents.message.chat.id =='-1001539063486'){
      sendText('-1001603495278',"Nuevo ingresante Stake 10 - II: " + contents.message.new_chat_member.first_name);
      stake10_2.appendRow([new Date (),contents.message.new_chat_member.id,contents.message.new_chat_member.first_name]);
    }
     else if(contents.message.chat.id =='-1001567679015')
    {
      sendText('-1001603495278',"Nuevo ingresante Stake 10 COMBO: " + contents.message.new_chat_member.first_name);
      stake10_combo.appendRow([new Date (),contents.message.new_chat_member.id,contents.message.new_chat_member.first_name]);
      }
   
  }else if (contents.message) {
    var mensaje_id=contents.message.message_id;
    let tipo = contents.message.chat.type;
    var text = contents.message.text;
    var id = contents.message.chat.id;
    var name = contents.message.chat.first_name;
    var last_name = contents.message.chat.last_name;
    var range = spreadsheet.getDataRange();
    var values = range.getValues();
    var confirmation_keyBoard = {
        "inline_keyboard": [
          [{
            "text": "✅",
            'callback_data': `1 ${id}` 
          }],
           [{
            "text": "❌",
            'callback_data': `0 ${id}`
          }]
          ]
        };
    
    var paquetes_keyboard = {
        "inline_keyboard": [
          [{
            "text": "🥇 Grupo VIP",
            'callback_data': 'vip',
          },
          {
            "text": "🇺🇸 American Picks",
            'callback_data': 'ap'
          }],
          [{
            "text": "🇵🇪 Liga Peruana",
            'callback_data': 'lp'
          },
          {
            "text": "💎 Paquete Completo ",
            'callback_data': 'pc'
          }],
          [{
            "text": " ⬅️ Regresar al menu",
            'callback_data': 'm'
          }]
          ]
        };
    var back_menu = {
          "inline_keyboard": [
            [{
              "text": " ⬅️ Regresar al menu",
              'callback_data': 'm'
            }]
          ]
        };
    var stake10_opciones = {
          "inline_keyboard": [
            [{"text": `${stake10n1}`,'callback_data': "s1" },{"text": `${stake10n2}`,'callback_data': "s2"}],
            [{"text" : `${stake10combo}`,'callback_data': "combo"}]
          ]
          };
    
    switch (text) {
          case '/start':
            if(id == '394714808'  || id == '1676794449' || id == '808541241'){
              sendText(id, 'Hola 👋 Has ingresado al panel de administrador.');
              sendText(id, 'Lista de comandos:');
              menu_admin = '/eliminar_stake10_I: borrar miembros del grupo Stake10-I';
              menu_admin_1 = '/eliminar_stake10_II: borrar miembros del grupo COMBO Stake10-II';
              menu_admin_2 = '/eliminar_stake10_combo: borrar miembros del grupo COMBO Stake10-Combo';
              sendMenu(id,menu_admin);
              sendMenu(id,menu_admin_1);
              sendMenu(id,menu_admin_2);
              sendText(id,regreso_menu);
              }   
            else{
              sendText(id, 'Hola, ' + name + ' 👋🏻 Tu ID de Telegaram para registrarte en nuestros Paquetes Premium es ' + id);
              sendText(id, '🏆 Bienvenido a PeruvianPicks 🏆');
              sendMenu(id, 'Escribe el número de la opción para conseguir información');
              sendMenu(id, menu);
              sendText(id,regreso_menu)
            } 
            break;
          case '/eliminar_stake10_I':
              eliminar_stake10_I();
            break;
          case '/eliminar_stake10_II':
              eliminar_stake10_II();
            break;
          case '/eliminar_stake10_combo':
              eliminar_stake10_combo();
            break;
          case 'menu': case 'MENU': case 'MENÚ': case 'menú': case 'Menu': case 'Menú':
            sendText(id, '🏆 Bienvenido a PeruvianPicks 🏆');
            sendMenu(id, 'Escribe el número de la opción para conseguir información');
            sendMenu(id, menu);
            break;
          
          case '0':
          sendText(id,'Accede a nuestros paquetes Completo y VIP por un precio exclusivo. Solo por hoy ⏳');
            enviar_foto_sin_caption(id,promo_peru1);
            enviar_foto_sin_caption(id,promo_peru2);
            sendText(id,info_pago_text);
            sendText(id, descripcion_pago);
            enviar_foto(id,info_pago_foto,regreso_menu);
          break;

          case '1':
            sendMenu(id,'¿Como apostar? Así de fácil.');
            sendMenu(id,'1️⃣ Si no tienes una, debes crearte una cuenta en una casa de apuestas (como Betsson o Solbet).');
            sendMenu(id,'2️⃣ Una vez creada la cuenta asegúrate de que los datos con los que te la creas son los mismos que los de tu cuenta de banco (cuenta que te pertenece)');
            sendMenu(id,'3️⃣ Deposita mediante pago efectivo realizando el pago desde tu banca móvil para que no te cobren comisión, caso contrario puedes hacerlo por visa pero con un pequeño % de comisión.');
            sendMenu(id,'4️⃣ Deposita y el siguiente paso cuando aparezca el dinero  en tu cuenta es seguir nuestras apuestas que publicamos todos los días.');
            sendMenu(id,'5️⃣ El dinero ganado puede ser retirado directamente a tu cuenta de banco mediante un depósito interbancario');
            sendMenu(id,'¿Aun no tienes tu cuenta de apuestas? 👨🏻‍💻');
            sendMenu(id, '👨🏻‍💻 Crea una en Solbet 👉🏻 https://solbet.pe/affiliates/?btag=454935',back_menu);
            break;
        
          case '2':
            sendMenu(id,'👑 Paquetes Premium 👑');
            sendMenu(id,'Escoge uno de nuestros Paquetes Premium de la lista ⤵️', paquetes_keyboard);
            break;

          case '3':
            if(values_admin[2][1] == 'Si' ){
              info_pago_foto = 'https://i.postimg.cc/28dRqSsQ/Whats-App-Image-2022-02-18-at-12-02-41.jpg';
              info_pago_text = 'Realiza tu pago a las siguentes cuentas y envíame una captura de pantalla ⤵️ '; 
              sendMenu(id, 'Un stake 10 es una apuesta de máxima seguridad donde te recomendamos apostar entre 10% y 20% del dinero en tu cuenta. Estos son nuestros STAKE10 disponibles ⤵️',stake10_opciones);
              }
            else{
            sendMenu(id, 'Un stake 10 es una apuesta de máxima seguridad donde te recomendamos apostar entre 10% y 20% del dinero en tu cuenta. ');
            sendMenu(id,'Actualmente no estamos ofreciendo STAKE10',back_menu);
            }
            break;

          case '4':
            sendText(id, 'Hola, ' + name + ' 👋🏻 Tu ID de Telegaram para registrarte en nuestros Planes Premium es ⤵️ ');
            sendText(id, id);
            sendText(id, regreso_menu);
            break;
      
          case '5':          
            sendText(id,'🗂️ Valida tu transacción 🗂️');
            sendMenu(id,'Envíame una captura de pantalla con tu comprobante de pago para que podamos validar tu transacción.'); 
            sendMenu(id,'Si tienes dudas, contáctate con @helpme0001', back_menu)
            break;

          case '6': 
            var answer= 'No se encontró tu ID. Si tienes dudas, envíame 11 para contactarte con un asesor ⤵️' ;
              for (i=1; i < values.length; i++){
                //sendText('1676794449',values.length)
                if(id == values[i][10]){
                    answer= 'Hola '+ name + ' Tu plan ' + values[i][5] + ' vence en: ' +   values[i][15] + ' días. Tu estado se encuentra : '  + values[i][18];
                }
              }
            sendText(id,'✅ Estado  de mi membresía ✅');
            sendText(id, answer);
            break;

          case '7':
            sendText(id,'🔥 Grupo Gratuito 🔥');
            sendText(id,'Para unirte a nuestro grupo GRATIS, dale click aquí ⤵️');
            sendMenu(id,'t.me/joinchat/BOY32kBFaZhmNTE5',back_menu);
            break;

          case '8':
            sendText(id,'📌 Renueva tu suscripción 📌');
            sendMenu(id,'Nuestros costos de renovación son:\n📌 50 soles por mes (VIP)\n📌 80 soles por mes (completo)\n📌 70 soles por 3 meses (VIP)\n📌 100 soles por 3 meses (completo)');
            sendMenu(id,'👊🏻 Puedes ser cliente de Peruvian Picks de por vida por:');
            sendMenu(id,'⚽ 170 soles el vip de fútbol\n⚽ 210 soles el Pack Completo');
            sendMenu(id,'Para renovar tu suscripción, elige un plan y mandame una captura de pantalla con tu comprobante de pago.');
            sendMenu(id,'Pudes consultar todos nuestros planes escribiendo <b> 2 </b>',back_menu);
            break;
        
          case '9':
            sendMenu(id,'MANEJO DE BANK [URGENTE] 👨🏻‍💻');
            sendMenu(id,'En peruvian picks utilizamos un sistema de porcentajes: el monto de cada apuesta debe colocado siguiendo los % de la parte inferior de cada apuesta enviada. ⬇️ ');
            sendMenu(id,'👉🏻 Es importante que SIEMPRE deben respetar los % si quieren ver resultados. Si tu bank aumenta o disminuye   es importante que tomes estos % sobre la base de tu bank INICIAL. Si empezaste con 100 y ahora tienes 80, sácale el % a esos 100.');
            sendMenu(id,'💰 Vamos a explicárselo con un ejemplo:');
            sendMenu(id, 'Un cliente empieza a apostar con 50 soles.');
            sendMenu(id,'• Como dice la guía que explicamos anteriormente, si tú bank es de 50 soles  y hacemos una apuesta de 10%, 5 soles es lo que debes apostarle a esa jugada.');
            sendMenu(id,'¿Se entendió? 👨🏻‍💻');
            sendMenu(id,'👨🏻‍💻 cualquier duda: @peruvianpicks1',back_menu);
            break;

          case '10':
            var link = 'https://solbet.pe/affiliates/?btag=454935';
            sendText(id,'🏦 Registro a Casa de Apuestas 🏦');
            sendText(id,'Para comenzar a apostar, debes crearte una cuenta en una casa de apuestas. Nosotros recomendamos Solbet. Puedes crearte tu cuenta gratis en el siguiente link ⤵️');
            sendMenu(id,link,back_menu);
            break;

            case '11':
            sendText(id,'Hola 👋🏻 ' + name + '. Para hablar con un asesor, te dejamos el siguiente contacto ⤵️') 
            sendText(id, contacto_asesor ,back_menu)
            break;

    
          case '/delete_stake10_combo':
            if(id == '394714808' || id == '1676794449' || id == '808541241'){
              eliminar_stake10_combo()
            }
            break;

          default: 
              if(contents.message['photo']==undefined){
                if(contents.message.chat.type == 'private'){
                  sendMenu(id,"Hola, escribe MENU para ver la lista de opciones 👨‍💻");
                }
              }else{
                  if (tipo =="private"){
                  sendText(id,'Muchas gracias, estamos analizando tu pago. Espéranos un momento.');
                  sendText(id, 'Si tienes dudas, contáctate con @helpme0001');
                  reenviar('1676794449',id,mensaje_id);
                  sendMenu('1676794449','Pago de ' + name + ' ' + last_name,confirmation_keyBoard);

                  reenviar('394714808',id,mensaje_id);
                  sendMenu('394714808','Pago de ' + name + ' ' + last_name,confirmation_keyBoard);

                  reenviar('808541241',id,mensaje_id);
                  sendMenu('808541241','Pago de ' + name + ' ' + last_name,confirmation_keyBoard);
                  }
              }
            break;
    }
  } 
}