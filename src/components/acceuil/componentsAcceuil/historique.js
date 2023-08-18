import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './historique.css'
import BarInfoJoueur from './barInfoJoueur';


//function Component1(){
//    return <h1> hello world </h1>
//}



const Historique = () => {   
                            const api_key ="RGAPI-5d93be63-18af-4120-93cd-6d48388c3d70"
                            
                            const [joueurRecheche, setJoueurRecherche] = useState("");
                            const [infoJoueur, setInfoJoueur] = useState("");
                            const [historique, setHistorique] = useState("");
                            const [idJoueur, setIdJoueur] = useState("");
                            const [rangJoueur, setRangJoueur] = useState("");
                            const [puuid, setPuuid] = useState("");
                            const initialStats = {
                              kill: 0,
                              death: 0,
                              assist: 0,
                              champ:''
                            };

                            const [statsList, setStatsList] = useState(new Array(10).fill(initialStats));


                            useEffect(() => {
                              if (puuid) {
                                  getHistorique(puuid);
                                  getRang(puuid);
                              }
                          }, [puuid]);


                          useEffect(() => {
                            if (historique) {
                                getDataMatch(historique);
                            }
                        }, [historique]);

                        useEffect(() => {
                          if (historique && statsList[0].kill === 0) {
                            // Vérifiez si les valeurs de statsList sont encore à zéro
                            getDataMatch(historique);
                          }
                        }, [historique, statsList]);

                            async function rechercheJoueur(event) {                   //recupere le puuid et le joueurid (joueur id pour avoir le rang)
                              try {
                                  var requeteJoueur = 'https://EUW1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + joueurRecheche + '?api_key=' + api_key;
                                  const response = await axios.get(requeteJoueur);
                                  
                                  setInfoJoueur(await response.data);
                                  setIdJoueur(response.data.id);
                                  setPuuid(response.data.puuid); // Utilisation de response.data.puuid au lieu de infoJoueur.puuid
                                  console.log(response.data)
                                  console.log(response.data.puuid); // Affichage du puuid récupéré
                                  
                                  // Suite du code qui dépend de la réponse de la requête
                                  // ...
                                  
                              } catch (error) {
                                  console.log(error);
                              }
                              

                            } 

                          async function getHistorique(event) {                       //repupere l id des 10 dernieres games 
                            try{
                              var requeteMatchHisto ='https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/'+  puuid + '/ids/'+ '?start=0&count=20&api_key=' + api_key;
                              const response = await axios.get(requeteMatchHisto);
                              setHistorique(response.data);
                              console.log(response.data)
                              console.log(historique);
                            
                            } catch (error) {
                              console.log(error);
                          }

                          }

                          async function getRang(event) {           //recupere les rang du joueur sur les différent mode de jeu

                            try{
                              var requeteRank = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + idJoueur + '?api_key=' + api_key;
                              const response = await axios.get(requeteRank);
                              setRangJoueur(response.data);
                              console.log(response.data);
                            } catch (error) {
                              console.log(error);
                            }

                          }

                          async function getDataMatch(event) {                //récupere les stats des 1à derniere gam du joueur
                            try{
                              console.log(historique);

                              const copieHistorique = [...historique];
                              const nouveauStatsList = [...statsList];
                              var tableauMatch = [10];
                              
                              for(let ibcl = 0; ibcl<10; ibcl++){

                                var requeteInfoMatch ='https://europe.api.riotgames.com/lol/match/v5/matches/' + copieHistorique[ibcl] + '?api_key=' + api_key;
                                const response = await axios.get(requeteInfoMatch);
                                
                                tableauMatch[ibcl] = response.data;
                                console.log(tableauMatch[ibcl]);

                                for(let ibcl2 = 0; ibcl2<10; ibcl2++){
                                  if(tableauMatch[ibcl].metadata.participants[ibcl2] === puuid){
                                            console.log(tableauMatch[ibcl].info.participants[ibcl2].championName)
                                            console.log(tableauMatch[ibcl].info.participants[ibcl2].kills)
                                            console.log(tableauMatch[ibcl].info.participants[ibcl2].deaths)
                                            console.log(tableauMatch[ibcl].info.participants[ibcl2].assists)
                                            
                                            const updatedStats = {
                                              kill: tableauMatch[ibcl].info.participants[ibcl2].kills,
                                              death: tableauMatch[ibcl].info.participants[ibcl2].deaths,
                                              assist: tableauMatch[ibcl].info.participants[ibcl2].assists,
                                              champ:tableauMatch[ibcl].info.participants[ibcl2].championName
                                            };

                                            nouveauStatsList[ibcl] = updatedStats;
                                            

                                            
                                  }
                                }

                              }
                              setStatsList(nouveauStatsList);
                              console.log("Nouveau statsList:", nouveauStatsList);
                              console.log(rangJoueur);

                            } catch (error) {
                              console.log(error);
                            }
                            
                          }



                            return(
                                <div>
                                    <input type="text" placeholder="rechercher joueur.." onChange={e => setJoueurRecherche(e.target.value)}/> 
                                    <button onClick={e => {
                                    rechercheJoueur(e);
                                    
                                  }}>rechercher joueur</button>

                                    {puuid && ( // Ajout de la condition ici
                                    
                                    <div className='containerInfoEtHistorique'>
                                      <p className='nomJoueur'> {infoJoueur.name}</p>
                                      <img className='iconelol' alt='icone lol du joueur' src={"http://ddragon.leagueoflegends.com/cdn/13.15.1/img/profileicon/" + infoJoueur.profileIconId + ".png "}></img>

                                    
                                    
                                      {statsList.map((stats, index) => (
                                      <div className='divHistorique' key={index} style={{marginBottom: '10px'}}>
                                        <img alt='image du perso de la game' src={'https://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/'+ stats.champ +'.png' }></img>
                                        <span> champ: {stats.champ}</span>
                                        <span> Kills: {stats.kill}</span>
                                        <span> Deaths: {stats.death}</span>
                                        <span> Assists: {stats.assist}</span>
                                        
                                      </div>
                                      ))}

                                      <div className='childInfoJoueur'>
                                        <BarInfoJoueur nomJoueur={joueurRecheche} rang={rangJoueur} kdas={statsList}/>
                                      </div>
                                      
                                      

                                    </div>

                                    )}

                                    
                                </div> //fonction fleché (autre syntax plus courte pour une fonction mais peut pas etre utilisé come methode ou constructeur)
                            );
                        }
export default Historique;    


//si pas de crochet, pas besoin e return dans la fonction fleché
//rafce => commande pour crée la base automatiquement