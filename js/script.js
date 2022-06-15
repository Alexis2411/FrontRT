//Constantes de acceso a elementos del documento HTML
const table = document.getElementById("tablaprueba");

//Opciones para conexion del publicador
const options = {
    connectTimeout: 4000,
    clientId: "front",
    keepalive: 60,
    clean: true,
};

//Constante para url API ubidots CAMBIE LOS DATOS POR SU TOKEN PERSONAL
//const brokerURL = "ws://20.119.68.166:8083/mqtt";
const brokerURL = "ws://52.188.161.154:8083/mqtt";

//Eventos WS de MQTT
const client = mqtt.connect(brokerURL, options);

client.on("connect", () => {
    console.log("CLIENTE CONECTADO A BROKER 👌");
    client.subscribe("placa", function(err) {
        if (!err) {
            console.log("SUBSCRIBE - SUCCESS");
        } else {
            console.log("SUBSCRIBE - ERROR");
        }
    });
});

client.on("message", function(topic, message) {
    const x = JSON.parse(message.toString());
    console.log(message.toString());
    agregarFila(x.license_plate, x.score, x.dscore);
});

client.on("reconnect", (error) => {
    console.log("reconnecting:", error);
});

client.on("error", (error) => {
    console.log("Connect Error:", error);
});

//Agrega datos a la tabla
function agregarFila(license_plate, score, dscore) {
    document.getElementById("tablaprueba").insertRow(1).innerHTML = '<td>' + license_plate + '</td><td>' + score + '</td><td>' + dscore + '</td>';
}