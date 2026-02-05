export function FeaturesInfo() {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recursos de Acessibilidade:
      </h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
          <div>
            <strong>Fontes Especiais:</strong> 5 fontes recomendadas para
            dislexia com seletor personalizável
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
          <div>
            <strong>Espaçamento:</strong> Maior distância entre linhas e letras
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
          <div>
            <strong>Cores Suaves:</strong> Fundo creme para reduzir cansaço
            visual
          </div>
        </div>
      </div>
    </div>
  );
}
