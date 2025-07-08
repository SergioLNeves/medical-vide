#!/bin/bash

# Script para executar testes unitários do Medical Vide

echo "🧪 Executando testes unitários do Medical Vide..."
echo "================================================"

# Executar testes
npm test

echo ""
echo "📊 Gerando relatório de cobertura..."
echo "===================================="

# Executar testes com cobertura
npm run test:coverage

echo ""
echo "✅ Testes concluídos!"
echo "Verifique os resultados acima para garantir que todos os testes passaram."
echo ""
echo "Para executar testes em modo watch (desenvolvimento):"
echo "  npm run test:watch"
echo ""
echo "Para ver o relatório de cobertura detalhado:"
echo "  Abra o arquivo coverage/lcov-report/index.html no navegador"
