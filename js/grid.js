function editar(botao){
    const id = botao.id;
    window.location.href = `/html/form.html?type=update&id=${id}`;
}

function loadStores() {
    const tbody = document.querySelector('#tabela-stores tbody');
    const noDataMsg = document.getElementById('no-data-msg');
    
    // Limpa os stores antigos
    tbody.innerHTML = '';

    fetch('http://localhost:8090/store', {
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
            // Se não houver dados
            if (dados.length === 0) {
                noDataMsg.style.display = 'block';
                return;
            }
            noDataMsg.style.display = 'none';

            // Adiciona os stores na tabela
            dados.forEach(store => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${store.nome}</td>
                    <td>${store.razaoSocial}</td>
                    <td>${store.endereco}</td>
                    <td>${store.dataAbertura}</td>
                    <td>
                    <button id="${store.id}" class="edit" onClick="editar(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
                    <button id="${store.id}" class="remove" onClick="remover(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button></td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            noDataMsg.style.display = 'block'; // Exibe mensagem de erro
            noDataMsg.textContent = 'Erro ao carregar os dados.';
        });
}

function remover(botao) {
    const id = botao.id;
    console.log(id)
    fetch(`http://localhost:8090/store/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(data => {
        alert("Registro atualizado");
    });
}    

window.onload = loadStores;

