import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PlantillaAdmin from "../components/PlantillaAdmin";
import "../style/EditarInstitucion.css";

const EditarInstitucion = () => {
    const { id } = useParams();

    const institucionDummy = {
        id,
        nombre: "Wade",
        tipo: "Municipalidad",
        direccion: "Calle Augusto Tamayo 180",
        correo: "tim.jennings@example.com",
        telefono: "999999999",
        sitioWeb: "ejemplo.com",
        contrasena: "123456",
    };

    const [form, setForm] = useState(institucionDummy);
    const [editable, setEditable] = useState({
        correo: false,
        telefono: false,
        sitioWeb: false,
        contrasena: false,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const toggleEditable = (campo) => {
        setEditable((prev) => ({ ...prev, [campo]: !prev[campo] }));
    };

    return (
        <PlantillaAdmin tituloHeader="Editar Institución">
            
                <div className="editar-inst-container">

                    <div className="inst-foto-col">
                        <div className="inst-foto"></div>
                        <label className="inst-btn-subir">
                            Subir Imagen
                            <input type="file" accept="image/*" hidden />
                        </label>
                    </div>

                    <div className="inst-bloque">
                        <div className="inst-campo">
                            <label>Nombre:</label>
                            <input type="text" value={form.nombre} disabled />
                        </div>

                        <div className="inst-campo">
                            <label>Tipo de Institución:</label>
                            <input type="text" value={form.tipo} disabled />
                        </div>

                        <div className="inst-campo">
                            <label>Dirección Física:</label>
                            <input type="text" value={form.direccion} disabled />
                        </div>
                    </div>

                    <div className="inst-bloque2">
                        {["correo", "telefono", "sitioWeb", "contrasena"].map((campo) => (
                            <div className="inst-campo editable" key={campo}>
                                <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                                <div className="campo-editable">
                                    <input
                                        type={campo === "contrasena" ? "password" : campo === "correo" ? "email" : "text"}
                                        name={campo}
                                        value={form[campo]}
                                        onChange={handleChange}
                                        readOnly={!editable[campo]}
                                    />
                                    <button type="button" onClick={() => toggleEditable(campo)}>
                                        <img src="/Boton_modificar.png" alt="editar" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="inst-botones">
                        <button type="button" className="btn-cancelar">Cancelar</button>
                        <button type="button" className="btn-guardar">Guardar Cambios</button>
                    </div>

                </div>
            
        </PlantillaAdmin>
    );
};

export default EditarInstitucion;
