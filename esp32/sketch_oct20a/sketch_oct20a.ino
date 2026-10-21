#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include "BluetoothSerial.h"

int tentativasConexaoBluetooth = 0;

const char* ssid = "Redmi Note 14S";
const char* password = "56788269";

bool conectado = false;

BluetoothSerial SerialBT;

WebServer server(8080);
JsonDocument doc;


void handleNull(){

  String message;

  doc["message"] = "Aplicação rodando";
  serializeJson(doc, message);

  server.send(200, "application/json", message);

  doc.clear();
}

void imprimirTesteSimples() {
  if (!SerialBT.connected()) {
    Serial.println("Erro: Impressora nao conectada!");
    return;
  }

  SerialBT.println("================================");
  SerialBT.println("      TESTE CONECTIVIDADE       ");
  SerialBT.println("================================");
  SerialBT.println(" O ESP32 funcionou perfeitamente ");
  SerialBT.println(" com a impressora Golden Sky!   ");
  SerialBT.println("================================");

  SerialBT.write(0x1B);
  SerialBT.write(0x64);
  SerialBT.write(3); 
  
  SerialBT.write(0x1D);
  SerialBT.write(0x56);
  SerialBT.write(65);
  SerialBT.write(0);

  Serial.println("Texto enviado e papel cortado!");
}



void setup() {

  Serial.begin(115200);
  SerialBT.begin("ESP_32", true);
  
  SerialBT.setPin("1234", 4);

  Serial.println("Conectando ao Bluetooth");

  while(!conectado && tentativasConexaoBluetooth <= 10){
    conectado = SerialBT.connect("SMART PRINTER");

    if(!conectado){
      Serial.println(".");
      delay(1000);
    }
  }

  if(conectado){
    Serial.println("Impressora conectada");
  }


  WiFi.begin(ssid, password);
  Serial.println("Conectando à rede");

  while(WiFi.status() != WL_CONNECTED){
    Serial.println(".");
    delay(1000);
  }

  if(WiFi.status() == WL_CONNECTED){
    Serial.print("Rede Conectada. IP: ");
    Serial.println(WiFi.localIP());
  }


  server.on("/", HTTP_GET, handleNull);
  server.on("/teste/impressora", HTTP_GET, imprimirTesteSimples);

  server.begin();
}

void loop() {
  // put your main code here, to run repeatedly:

  server.handleClient();
}
