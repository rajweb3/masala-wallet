# zkSNARKs with Zokrates

## ZK Circuits
- Hashing Circuit is purely to help generate the appropriate zkSNARK friendly hash output.
- Proving Circuit is the key ZK circuit written to facilitate all the ZK verifications on-chain.

## Pre-requisites
Ensure you have installed the Zokrates tool, you can do so by running the command. 
```
curl -LSfs get.zokrat.es | sh
```

## Compiling and generating the verification key and contract
Run the following commands in the same order

```
zokrates compile -i proving.zok

zokrates setup

zokrates export-verifier
```

## Generating the proofs 
Pass the appropriate arguments
```
zokrates compute-witness -a 0 0 0 0 0 0 

zokrates generate-proof
```

