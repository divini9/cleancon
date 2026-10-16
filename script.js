document.addEventListener('DOMContentLoaded', () => {
    const btnCalcular = document.getElementById('btnCalcular');
    const btnSugerir = document.getElementById('btnSugerir');

    // Sugere a receita perfeita que cabe fisicamente na garrafa PET de 2L
    btnSugerir.addEventListener('click', () => {
        const plantaSelecionada = document.getElementById('tipoPlanta').value;
        
        if (plantaSelecionada === 'tomate') {
            document.getElementById('cafe').value = 40;   
            document.getElementById('banana').value = 80; 
            document.getElementById('batata').value = 40; 
            document.getElementById('ovo').value = 10;    
        } else if (plantaSelecionada === 'feijao') {
            document.getElementById('cafe').value = 30;
            document.getElementById('banana').value = 30;
            document.getElementById('batata').value = 20;
            document.getElementById('ovo').value = 5;
        }
        
        btnCalcular.click();
    });

    btnCalcular.addEventListener('click', () => {
        const cafe = parseFloat(document.getElementById('cafe').value) || 0;
        const banana = parseFloat(document.getElementById('banana').value) || 0;
        const batata = parseFloat(document.getElementById('batata').value) || 0;
        const ovo = parseFloat(document.getElementById('ovo').value) || 0;
        const tipoPlanta = document.getElementById('tipoPlanta').value;
        
        const totalVerdes = cafe + banana + batata + ovo;
        const totalSecos = totalVerdes; // Proporção 1:1 com matéria seca

        // Cálculos Nutricionais
        const nFinal  = (cafe * 20);
        const pFinal  = (cafe * 3) + (banana * 7) + (batata * 2) + (ovo * 4);
        const kFinal  = (cafe * 3) + (banana * 42) + (batata * 18);
        const caFinal = (banana * 19) + (batata * 2) + (ovo * 390);

        document.getElementById('totalVerdes').innerText = totalVerdes.toFixed(0);
        document.getElementById('totalSecos').innerText = totalSecos.toFixed(0);
        document.getElementById('nutriN').innerText = Math.round(nFinal).toLocaleString('pt-BR');
        document.getElementById('nutriP').innerText = Math.round(pFinal).toLocaleString('pt-BR');
        document.getElementById('nutriK').innerText = Math.round(kFinal).toLocaleString('pt-BR');
        document.getElementById('nutriCa').innerText = Math.round(caFinal).toLocaleString('pt-BR');

        let diagnostico = "";
        const pesoTotalComposto = totalVerdes + totalSecos;

        if (totalVerdes === 0) {
            diagnostico = "Adicione valores ou clique em 'Sugerir Receita para 1 Garrafa PET'.";
        } else if (pesoTotalComposto > 800) {
            diagnostico = `⚠️ <strong>Volume excessivo para a Garrafa PET (${pesoTotalComposto}g)!</strong> Somando a matéria seca obrigatória, vai transbordar. Reduza os ingredientes para não sufocar a compostagem.`;
        } else {
            const nomePlanta = tipoPlanta === 'tomate' ? "🍅 Tomateiro" : "🫘 Feijoeiro";
            
            // Cálculos Agronômicos de Fracionamento e Aplicação Segura:
            // O composto úmido reduz cerca de 60% do peso original após pronto.
            const aduboSolidoPronto = Math.round(pesoTotalComposto * 0.4); 
            // Estimativa de colheres de sopa cheias (~25g cada) obtidas no final
            const totalColheres = Math.max(Math.round(aduboSolidoPronto / 25), 1);
            
            // Divisão das doses baseada na agressividade e tamanho da planta
            let colheresPorMes = 0;
            let mlChorumePorSemana = 0;
            let proporcaoAgua = "";

            if (tipoPlanta === 'tomate') {
                colheresPorMes = Math.min(totalColheres, 4); // Tomate aguenta até 4 colheres por mês
                mlChorumePorSemana = 15; // ~1 colher de sopa de chorume puro por semana
                proporcaoAgua = "Dilua em 150ml de água limpa";
            } else {
                colheresPorMes = Math.min(totalColheres, 2); // Feijão é sensível, máximo 2 colheres por mês
                mlChorumePorSemana = 5;  // ~1 colher de chá de chorume puro por semana
                proporcaoAgua = "Dilua em 100ml de água limpa";
            }

            diagnostico = `✅ <strong>Proporção Perfeita e Segura para 1 planta!</strong><br><br>
            📦 <strong>Rendimento Estimado:</strong> Após 30 a 40 dias, essa garrafa vai produzir cerca de <strong>${aduboSolidoPronto}g</strong> de adubo orgânico puro.<br><br>
            
            💧 <strong>1. APLICAÇÃO DO LÍQUIDO (Semanal):</strong><br>
            Colete o biofertilizante escuro que escorrer no fundo da garrafa. Uma vez por semana, pegue **${mlChorumePorSemana} ml** desse líquido, **${proporcaoAgua}** e regue a terra do seu ${nomePlanta}. Nunca jogue puro pois queima as raízes!<br><br>
            
            🪨 <strong>2. APLICAÇÃO DO SÓLIDO EM CIMA (Mensal):</strong><br>
            Retire a terra preta de cima da composteira e aplique apenas **${colheresPorMes} colheres de sopa** espalhadas ao redor do caule do seu ${nomePlanta} uma vez a cada 30 dias. O que sobrar na garrafa, guarde em um saco furado ou use em outra planta.`;
        }

        document.getElementById('textoAjuste').innerHTML = diagnostico;
        document.getElementById('resultadoDiv').style.display = 'block';
    });
});
