// ===== VIA CEP COM FETCH =====

async function buscarEnderecoPorCEP(cep) {
  // remove tudo que não for número
  const cepLimpo = cep.replace(/\D/g, "");

  // validação básica
  if (cepLimpo.length !== 8) {
    throw new Error("CEP inválido");
  }

  // chamada à API ViaCEP
  const response = await fetch(
    https://viacep.com.br/ws/${cepLimpo}/json/
  );

  if (!response.ok) {
    throw new Error("Erro ao consultar o CEP");
  }

  const data = await response.json();

  // ViaCEP retorna { erro: true } quando não encontra
  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

return data;
}
document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");
  const ruaInput = document.getElementById("rua");
  const bairroInput = document.getElementById("bairro");
  const cidadeInput = document.getElementById("cidade");
  const ufInput = document.getElementById("uf");

  cepInput.addEventListener("blur", async () => {
    try {
      const endereco = await buscarEnderecoPorCEP(cepInput.value);

      ruaInput.value = endereco.logradouro || "";
      bairroInput.value = endereco.bairro || "";
      cidadeInput.value = endereco.localidade || "";
      ufInput.value = endereco.uf || "";

    } catch (erro) {
      alert(erro.message);
      ruaInput.value = "";
      bairroInput.value = "";
      cidadeInput.value = "";
      ufInput.value = "";
}
});
});


