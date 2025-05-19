'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [edad, setEdad] = useState('');
  const [celular, setCelular] = useState('');
  const [sexo, setSexo] = useState('');
  const [peso, setPeso] = useState('');

  const guardarInformacion = () => {
    localStorage.setItem('nombreUsuario', nombre);
    localStorage.setItem('identificacionUsuario', identificacion);
    localStorage.setItem('edadUsuario', edad);
    localStorage.setItem('celularUsuario', celular);
    localStorage.setItem('sexoUsuario', sexo);
    localStorage.setItem('pesoUsuario', peso);
    alert('Información guardada exitosamente ✅');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 flex items-center justify-center">
      <section className="max-w-4xl w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold">Bienvenida a tu App Fitness</h1>
          <p className="text-lg mt-2">
            Lleva el control de tus entrenamientos, nutrición y progreso físico.
          </p>
        </div>

        <form className="grid gap-4 md:grid-cols-2 text-left">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Número de identificación"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Peso actual (kg)"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </form>

        <button
          onClick={guardarInformacion}
          className="mt-4 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl font-semibold transition"
        >
          Guardar Información
        </button>

        <div className="grid gap-6 md:grid-cols-3 pt-6">
          <Link
            href="/trainings"
            className="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl shadow-md transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-2">🏋️‍♀️ Entrenamientos</h2>
            <p>Planifica y registra tus rutinas de ejercicio.</p>
          </Link>

          <Link
            href="/nutrition"
            className="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl shadow-md transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-2">🥗 Nutrición</h2>
            <p>Lleva el control de tus comidas y hábitos saludables.</p>
          </Link>

          <Link
            href="/progress"
            className="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl shadow-md transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-2">📈 Progreso</h2>
            <p>Monitorea tu evolución física y metas.</p>
          </Link>
        </div>

        <footer className="pt-8 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Gimnasio IronWorks. Todos los derechos reservados.
        </footer>
      </section>
    </main>
  );
}
