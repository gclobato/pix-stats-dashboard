// URL da API
const url = "https://olinda.bcb.gov.br/olinda/servico/Pix_DadosAbertos/versao/v1/odata/EstatisticasTransacoesPix(Database=@Database)?@Database='2024'&$top=100&$format=json";

// Buscar dados da API
async function fetchPixData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    console.log("Dados recebidos da API:", data); // Verifique os dados recebidos
    if (data.value) {
      populateTable(data.value);
    } else {
      console.error("Estrutura dos dados inesperada:", data);
    }
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

// Preencher a tabela com os dados recebidos
function populateTable(data) {
  const tableBody = document.getElementById('pixTable').getElementsByTagName('tbody')[0];
  data.forEach(item => {
    console.log("Item atual:", item); // Verifique cada item dos dados
    let row = tableBody.insertRow();
    let cellDate = row.insertCell(0);
    let cellQuantity = row.insertCell(1);
    let cellVolume = row.insertCell(2);
    cellDate.textContent = item.AnoMes;  // Substitua 'AnoMes' pelo nome correto da propriedade
    cellQuantity.textContent = item.QUANTIDADE;  // Substitua 'QUANTIDADE' pelo nome correto da propriedade
    cellVolume.textContent = item.VALOR;  // Substitua 'VALOR' pelo nome correto da propriedade
  });
}

// Chama a função para buscar dados e preencher a tabela
fetchPixData()