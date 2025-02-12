package com.example.crud.domain.store;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="store")
@Entity(name="store")
@EqualsAndHashCode(of = "id")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Store {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String nome;

    private String razaoSocial;

    private String endereco;

    private String dataAbertura;

    public Store(RequestStore requestStore){
        this.nome = requestStore.nome();
        this.razaoSocial = requestStore.razaoSocial();
        this.endereco = requestStore.endereco();
        this.dataAbertura = requestStore.dataAbertura();
    }

}
