# MiniCoreVentas

Este proyecto es una aplicación full stack dividida en backend en ASP.NET Core y frontend en React (Vite). El objetivo principal es permitir el cálculo de comisiones por vendedor, filtrando las ventas por un rango de fechas.

Tecnologías Utilizadas
Backend: ASP.NET Core Web API
Frontend: React + Vite
Pruebas de API: Swagger

Descripción de la Funcionalidad (MiniCore)
El sistema maneja tres tablas (con datos quemados):
Vendedores
Reglas de Comisión
Ventas

Flujo de la Aplicación:
El usuario visualiza las tres tablas base con todos los datos.

Selecciona un rango de fechas.
El frontend envía la solicitud al backend usando Axios.
El backend filtra las ventas dentro de ese rango.
Calcula la comisión por vendedor según su regla.
Devuelve los resultados.
El frontend muestra el resultado en una tabla de comisiones.

Backend - Estructura Principal
Modelo: Vendedor, Venta, Regla

Servicio:

IMiniCoreService.cs: Define el contrato.
MiniCoreService.cs: Implementa la lógica de negocio (filtro + cálculo).

Controlador:

MiniCoreController.cs: Expone el endpoint /api/MiniCore/calcular-comisiones.

Frontend - Estructura Principal
Página principal en MiniCore.jsx.
Manejo de filtros y resultados.

La vista incluye:
Las tres tablas base
El formulario de rango de fechas
La tabla de resultados de comisiones

Ejemplo de Uso
Rango de fechas: 01/05/2025 - 20/06/2025

Vendedor	Comisión
Jorge Negrete	$40.00
Ricardo Vega	$48.00
Diego Pérez	$90.00
Martín Torres	$0.00
