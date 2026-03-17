package com.example.defipilot.defipilot_app.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="investments")
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String wallet;

    @Column(name="pool_id")
    private int poolId;

    private double amount;

    public int getId() {
        return id;
    }

    public String getWallet() {
        return wallet;
    }

    public int getPoolId() {
        return poolId;
    }

    public double getAmount() {
        return amount;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setWallet(String wallet) {
        this.wallet = wallet;
    }

    public void setPoolId(int poolId) {
        this.poolId = poolId;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}