'use client';

import { useEffect, useState } from 'react';

type Training = {
  id: number;
  name: string;
  description: string;
};

const ejemploEntrenamientos: Training[] = [
  { id: 1, name: 'Piernas Fuertes', description: 'Sentadillas, zancadas, peso muerto' },
  { id: 2, name: 'Cardio Intenso', description: 'Cinta, bicicleta, jumping jacks' },
  { id: 3, name: 'Full Body Express', description: 'Circuito de cuerpo completo' },
];

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [error, setError] = useState('');
  const [seleccionado, setSeleccionado] = useState<Training | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/trainings');
        if (!res.ok) throw new Error('Respuesta no válida');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTrainings(data);
        } else {
          throw new Error('La respuesta no es un array');
        }
      } catch (err: any) {
        setError(err.message);
        setTrainings(ejemploEntrenamientos); // Usa ejemplos si falla la API
      }
    };

    fetchTrainings();
  }, []);

  const handleSeleccion = (training: Training) => {
    setSeleccionado(training);
    localStorage.setItem('entrenamientoSeleccionado', JSON.stringify(training));  // Guardamos en localStorage
  };

  return (
    <main className="p-8 space-y-6 min-h-screen bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold">🏋️ Selecciona un entrenamiento</h1>
      <p className="text-sm text-gray-600">
        {error ? 'Mostrando ejemplos por error en la API.' : 'Entrenamientos cargados desde el servidor.'}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainings.map((training) => (
          <button
            key={training.id}
            onClick={() => handleSeleccion(training)}
            className={`p-4 rounded border-2 text-left shadow hover:shadow-md transition ${
              seleccionado?.id === training.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-transparent bg-white'
            }`}
          >
            <h2 className="text-lg font-semibold">{training.name}</h2>
            <p className="text-sm text-gray-700">{training.description}</p>
          </button>
        ))}
      </div>

      {seleccionado && (
        <div className="mt-8 p-4 bg-white rounded shadow border-l-4 border-blue-600">
          <h3 className="text-xl font-bold">🏆 Entrenamiento seleccionado:</h3>
          <p><strong>{seleccionado.name}</strong></p>
          <p>{seleccionado.description}</p>
        </div>
      )}
    </main>
  );
}
