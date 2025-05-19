'use client';

import { useEffect, useState } from 'react';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

type SeguimientoDia = {
  ejercicio: boolean;
  comida: boolean;
};

export default function ProgressPage() {
  const [planEntrenamiento, setPlanEntrenamiento] = useState<{ nombre: string; descripcion: string } | null>(null);
  const [planNutricion, setPlanNutricion] = useState<{ nombre: string; descripcion: string } | null>(null);
  const [seguimiento, setSeguimiento] = useState<Record<string, SeguimientoDia>>({});

  useEffect(() => {
    const entreno = localStorage.getItem('planEntrenamiento');
    const nutricion = localStorage.getItem('planNutricion');
    const seguimientoGuardado = localStorage.getItem('seguimientoProgreso');

    if (entreno) setPlanEntrenamiento(JSON.parse(entreno));
    if (nutricion) setPlanNutricion(JSON.parse(nutricion));
    if (seguimientoGuardado) {
      setSeguimiento(JSON.parse(seguimientoGuardado));
    } else {
      const estadoInicial: Record<string, SeguimientoDia> = {};
      diasSemana.forEach(dia => {
        estadoInicial[dia] = { ejercicio: false, comida: false };
      });
      setSeguimiento(estadoInicial);
    }
  }, []);

  const toggleCheckbox = (dia: string, campo: keyof SeguimientoDia) => {
    const actualizado = {
      ...seguimiento,
      [dia]: {
        ...seguimiento[dia],
        [campo]: !seguimiento[dia][campo],
      },
    };
    setSeguimiento(actualizado);
    localStorage.setItem('seguimientoProgreso', JSON.stringify(actualizado));
  };

  // ✅ Calcular resumen semanal
  const resumen = () => {
    let totalEjercicio = 0;
    let totalComida = 0;

    diasSemana.forEach(dia => {
      if (seguimiento[dia]?.ejercicio) totalEjercicio++;
      if (seguimiento[dia]?.comida) totalComida++;
    });

    const totalChecks = totalEjercicio + totalComida;
    const porcentaje = Math.round((totalChecks / (diasSemana.length * 2)) * 100);

    return {
      totalEjercicio,
      totalComida,
      porcentaje,
    };
  };

  const { totalEjercicio, totalComida, porcentaje } = resumen();

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <section className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">📈 Progreso</h1>
        <p className="text-lg">Revisa tus selecciones para seguimiento.</p>

        {planEntrenamiento && (
          <div>
            <h2 className="text-xl font-semibold">🏋️ Entrenamiento seleccionado:</h2>
            <p className="font-medium">{planEntrenamiento.nombre}</p>
            <p>{planEntrenamiento.descripcion}</p>
          </div>
        )}

        {planNutricion && (
          <div>
            <h2 className="text-xl font-semibold">🥗 Nutrición seleccionada:</h2>
            <p className="font-medium">{planNutricion.nombre}</p>
            <p>{planNutricion.descripcion}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold pt-4 pb-2">📅 Seguimiento semanal</h2>
          <table className="w-full border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Día</th>
                <th className="p-2 border">✅ Ejercicio hecho</th>
                <th className="p-2 border">🍽️ Comió bien</th>
              </tr>
            </thead>
            <tbody>
              {diasSemana.map(dia => (
                <tr key={dia} className="border-t">
                  <td className="p-2 border">{dia}</td>
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      checked={seguimiento[dia]?.ejercicio || false}
                      onChange={() => toggleCheckbox(dia, 'ejercicio')}
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      checked={seguimiento[dia]?.comida || false}
                      onChange={() => toggleCheckbox(dia, 'comida')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Resumen semanal */}
        <div className="pt-6 border-t border-gray-300">
          <h3 className="text-lg font-bold">📊 Resumen Semanal</h3>
          <p>✅ Días con ejercicio: <span className="font-semibold">{totalEjercicio} / 7</span></p>
          <p>🍽️ Días con buena alimentación: <span className="font-semibold">{totalComida} / 7</span></p>
          <p>📈 Cumplimiento total: <span className="font-bold">{porcentaje}%</span></p>
        </div>
      </section>
    </main>
  );
}
