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
    populateTable(data.value);
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}



// Preencher a tabela com os dados recebidos
function populateTable(data) {
  const tableBody = document.getElementById('pixTable').getElementsByTagName('tbody')[0];
  data.forEach(item => {
    let row = tableBody.insertRow();
    let cellDate = row.insertCell(0);
    let cellQuantity = row.insertCell(1);
    let cellVolume = row.insertCell(2);
    cellDate.textContent = item.Data;  // Substitua 'Data' pelo nome correto da propriedade
    cellQuantity.textContent = item.Quantidade;  // Substitua 'Quantidade' pelo nome correto da propriedade
    cellVolume.textContent = item.VolumeFinanceiro;  // Substitua 'VolumeFinanceiro' pelo nome correto da propriedade
  });
}

// Chama a função para buscar dados e preencher a tabela
fetchPixData();
