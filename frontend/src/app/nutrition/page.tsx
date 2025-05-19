'use client';

import { useEffect, useState } from 'react';

const planes = [
  {
    nombre: 'Alto en Proteínas',
    descripcion: 'Pechuga de pollo, huevo, legumbres',
  },
  {
    nombre: 'Bajo en Carbos',
    descripcion: 'Verduras, aguacate, frutos secos',
  },
  {
    nombre: 'Dieta Balanceada',
    descripcion: 'Frutas, verduras, carnes magras',
  },
];

export default function NutritionPage() {
  const [nombre, setNombre] = useState('');
  const [planSeleccionado, setPlanSeleccionado] = useState<{ nombre: string; descripcion: string } | null>(null);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    const planGuardado = localStorage.getItem('planNutricion');

    if (nombreGuardado) setNombre(nombreGuardado);
    if (planGuardado) {
      const planObj = JSON.parse(planGuardado);
      setPlanSeleccionado(planObj);
    }
  }, []);

  const seleccionarPlan = (plan: { nombre: string; descripcion: string }) => {
    setPlanSeleccionado(plan);
    localStorage.setItem('planNutricion', JSON.stringify(plan));
  };

  return (
    <main className="min-h-screen bg-white text-black p-8 flex items-center justify-center">
      <section className="max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-bold">🥗 Planes de Nutrición</h1>
        <p className="text-lg">
          Hola <span className="font-semibold">{nombre || 'usuario/a'}</span>, selecciona tu plan de nutrición:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {planes.map((plan) => (
            <button
              key={plan.nombre}
              onClick={() => seleccionarPlan(plan)}
              className={`p-4 rounded-xl text-left border transition ${
                planSeleccionado?.nombre === plan.nombre
                  ? 'bg-black text-white border-black'
                  : 'bg-white hover:bg-gray-100 border-gray-300'
              }`}
            >
              <h2 className="text-xl font-semibold">{plan.nombre}</h2>
              <p>{plan.descripcion}</p>
            </button>
          ))}
        </div>

        {planSeleccionado && (
          <div className="pt-6 border-t border-gray-300">
            <h3 className="text-lg font-bold">🍽️ Nutrición seleccionada:</h3>
            <p className="text-xl font-semibold">{planSeleccionado.nombre}</p>
            <p>{planSeleccionado.descripcion}</p>
          </div>
        )}
      </section>
    </main>
  );
}
