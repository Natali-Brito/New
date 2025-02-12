package com.example.crud.domain.store;

import jakarta.validation.constraints.NotBlank;

public record RequestStore(

    @NotBlank 
    String nome, 

    @NotBlank
    String razaoSocial,
    
    @NotBlank
    String endereco, 
 
    String dataAbertura
    ) {

}

