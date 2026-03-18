package com.example.defipilot.defipilot_app.Controller;

import com.example.defipilot.defipilot_app.Entity.Pool;
import com.example.defipilot.defipilot_app.Repository.PoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pools")
@CrossOrigin(origins = "*")
public class PoolController {

    @Autowired
    PoolRepository repo;

    @GetMapping
    public List<Pool> getPools(){
        return repo.findAll();
    }

    @GetMapping("/recommendation")
    public Pool bestPool(){

        List<Pool> pools = repo.findAll();

        Pool best=null;
        double bestScore=-999;

        for(Pool p : pools){

            double score = p.getApr() - p.getRisk();

            if(score > bestScore){
                bestScore = score;
                best = p;
            }

        }

        return best;
    }

    @PostMapping("/simulate")
    public Map<String,Object> simulate(@RequestBody Map<String,Object> req){

        Map<String,Object> res = new HashMap<>();

        if(req.get("amount")==null || req.get("apr")==null){
            res.put("error","Invalid request");
            return res;
        }

        double amount = Double.parseDouble(req.get("amount").toString());
        double apr = Double.parseDouble(req.get("apr").toString());

        double yearly = amount * (apr/100);

        res.put("yearlyYield", yearly);

        return res;
    }

    @GetMapping("/ai-pools")
    public List<Map<String,Object>> getPoolsWithScore(){

        List<Pool> pools = repo.findAll();

        List<Map<String,Object>> result = new ArrayList<>();

        for(Pool p : pools){

            double score = p.getApr() - p.getRisk();

            Map<String,Object> data = new HashMap<>();

            data.put("id",p.getId());
            data.put("token",p.getToken());
            data.put("apr",p.getApr());
            data.put("risk",p.getRisk());
            data.put("score",score);

            result.add(data);

        }

        return result;

    }

}
