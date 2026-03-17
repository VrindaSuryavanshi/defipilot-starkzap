package com.example.defipilot.defipilot_app.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="pools")
public class Pool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="token")
    private String token;

    @Column(name="apr")
    private double apr;

    @Column(name="risk_score")
    private double risk;

    public Pool(){}

    public Pool(Long id,String token,double apr,double risk){
        this.id=id;
        this.token=token;
        this.apr=apr;
        this.risk=risk;
    }

    public Long getId(){
        return id;
    }

    public String getToken(){
        return token;
    }

    public double getApr(){
        return apr;
    }

    public double getRisk(){
        return risk;
    }

    public void setId(Long id){
        this.id=id;
    }

    public void setToken(String token){
        this.token=token;
    }

    public void setApr(double apr){
        this.apr=apr;
    }

    public void setRisk(double risk){
        this.risk=risk;
    }

}