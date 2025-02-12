package com.example.crud.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.domain.store.RequestStore;
import com.example.crud.domain.store.Store;
import com.example.crud.repositories.StoreRepository;

import jakarta.validation.Valid;

@RestController 
//Indica que a classe vai cuidar das requisições e respostas HTTP
@CrossOrigin("*")
@RequestMapping("/store")
//Direciona as requisições HTTP para os métodos corretos
public class StoreController {

    @Autowired
    private StoreRepository repository;
    //Importa a interface que implementará os métodos default do JPA.
    
    
    @GetMapping
    //Define uma rota que responde a requisições HTTP GET
    public ResponseEntity<?> getAllStores(){
        var allStores = repository.findAll();
        return ResponseEntity.ok(allStores);
    }

    @GetMapping(("/{id}"))
    public ResponseEntity getStoresById(@PathVariable String id){
        boolean exists = repository.existsById(id);

        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
            body("Registro com ID " + id + " não encontrado.");
        }
        var storeById = repository.findById(id);

        return ResponseEntity.ok(storeById);
    }


    @PostMapping
    public ResponseEntity<Store> createStores(@RequestBody @Valid RequestStore data){
        Store newStore = new Store(data);
        //Cria um novo objeto Store que recebe como parametro do construtor o record com os campos validados.
        repository.save(newStore);
        //Salva os dados recebidos e validados no banco de dados.  
        return ResponseEntity.ok(newStore);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStore(@PathVariable String id, @RequestBody @Valid RequestStore data) {
       
        Store store = repository.findById(id).orElse(null);

        if (store == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
            body("Registro com ID " + id + " não encontrado.");
        }

        store.setNome(data.nome());
        store.setRazaoSocial(data.razaoSocial());
        store.setEndereco(data.endereco());
        store.setDataAbertura(data.dataAbertura());
        store = repository.save(store);
        return ResponseEntity.ok(store);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStore(@PathVariable String id) {
        boolean exists = repository.existsById(id);

        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
            body("Registro com ID " + id + " não encontrado.");
        }

        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}

