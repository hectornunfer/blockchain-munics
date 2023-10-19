// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FabricaContract {
    uint idDigits = 16;
    uint idModulus = 10 ** idDigits;

    struct Producto {
        string nombre;
        uint id;
    }

    Producto[] public productos;

    event NuevoProducto(uint ArrayProductoId, string nombre, uint id);

    mapping(uint => address) private productoAPropietario;
    mapping(address => uint) private propietarioProductos;

    function _crearProducto(string memory _nombre, uint _id) private {
        productos.push(Producto(_nombre, _id));
        uint productoId = productos.length - 1;
        Propiedad(productoId);
        emit NuevoProducto(productoId, _nombre, _id);
    }

    function _generarIdAleatorio(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % idModulus;
    }

    function crearProductoAleatorio(string memory _nombre) public  {
        uint _randId = _generarIdAleatorio(_nombre);
        _crearProducto(_nombre, _randId);
    }

    function Propiedad(uint productoId) private  {
    // Actualizamos el mapping productoAPropietario para almacenar msg.sender bajo ese productoId
    productoAPropietario[productoId] = msg.sender;
    // Aumentamos propietarioProductos para msg.sender
    propietarioProductos[msg.sender]++;
    }

    function getProductosPorPropietario(address _propietario) external view returns (uint[] memory) {
        uint contador = 0;
        uint cantidadProductos = propietarioProductos[_propietario];
        uint[] memory resultado = new uint[](cantidadProductos);
        for (uint i = 0; i < productos.length; i++) {
            if (productoAPropietario[i] == _propietario) {
                resultado[contador] = i;
                contador++;
            }
        }
        return resultado;
    }

}