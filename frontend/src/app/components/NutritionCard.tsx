// src/app/components/NutritionCard.tsx
type NutritionData = {
  user: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function NutritionCard({ data }: { data: NutritionData }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-semibold">{data.user} - {data.date}</h2>
      <p>Calorías: {data.calories} kcal</p>
      <p>Proteínas: {data.protein} g</p>
      <p>Carbohidratos: {data.carbs} g</p>
      <p>Grasas: {data.fat} g</p>
    </div>
  );
}
