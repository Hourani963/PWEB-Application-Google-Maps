package com.PWEB.PWEB.controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("map")
@CrossOrigin("*")
public class ident {

    @PostMapping("signin")
    public boolean signIn(@RequestParam("email") String email, @RequestParam("password") String pass){
        if(email.equals("ahmad") && pass.equals("syfsa")){
            return true;
        }
        return false;
    }
}
