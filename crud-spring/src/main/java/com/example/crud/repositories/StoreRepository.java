package com.example.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.crud.domain.store.Store;

public interface StoreRepository extends JpaRepository<Store, String> {
    //Interface que implementa os métodos default do JPA.

}
