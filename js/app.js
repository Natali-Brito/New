window.onload = function () { 
    let params = new URLSearchParams(document.location.search);
    let type = params.get("type"); 

    if(type == "create"){
        document.getElementById('title').innerHTML="Cadastrar";
        document.getElementById('save').addEventListener('click', function(event){
            event.preventDefault(); 
            cadastrar();
            window.location.href="/index.html"
        
        });
    }
    else if(type == "update"){
        document.getElementById('title').innerHTML="Atualizar";
        preencherCampos(params.get("id"));
        document.getElementById('save').addEventListener('click', function(event){
            event.preventDefault(); // Impede o envio do formulário por padrão
            atualizar(params.get("id"));
            window.location.href="/index.html"
        
        });
    }  
}

function cadastrar(){

    const nome = document.getElementById('nome').value;
    const razaoSocial = document.getElementById('razaoSocial').value;
    const endereco = document.getElementById('endereco').value;
    const dataAbertura = document.getElementById('dataAbertura').value;
    
    fetch('http://localhost:8090/store', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nome,
        razaoSocial,
        endereco,
        dataAbertura
    })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        // Verifica se a resposta tem conteúdo antes de tentar converter para JSON
        alert('Loja cadastrada com sucesso!');

        return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .then(data => {
        // Resetar formulário após o envio
        document.getElementById('storeForm').reset();
    })
    .catch(error => console.error('Erro:', error));

}

function atualizar(id) {
    const nome = document.getElementById('nome').value;
    const razaoSocial = document.getElementById('razaoSocial').value;
    const endereco = document.getElementById('endereco').value;
    const dataAbertura = document.getElementById('dataAbertura').value;

    fetch(`http://localhost:8090/store/${id}`, {  
        method: 'PUT',  
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            razaoSocial,
            endereco,
            dataAbertura
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Loja atualizada com sucesso!');
        // Resetar formulário após o envio (opcional)
        document.getElementById('storeForm').reset();
    })
    .catch(error => console.error('Erro:', error));
}

function preencherCampos(id){

    fetch(`http://localhost:8090/store/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }})
        .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
        }
        return response.json();
    })
    .then(dados => {
        document.getElementById('nome').value = dados.nome;
        document.getElementById('razaoSocial').value = dados.razaoSocial;
        document.getElementById('endereco').value = dados.endereco;
        document.getElementById('dataAbertura').value = dados.dataAbertura; 
    })
    .catch(error => {
        console.error('Erro ao carregar os dados:', error);
    });
}