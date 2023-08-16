import React, { useState, useEffect } from 'react'

const BarInfoJoueur = (props) => {

  const [tierElo, setTierElo] = useState('');
  const [divisionElo, setDivisionElo] = useState('');
  

  console.log(props.rang);
  console.log(props.rang.length);
  console.log(props.kdas[0].kill);

  useEffect(() => {
    

    for(let ibcl=0; ibcl<props.rang.length; ibcl++){
      if(props.rang[ibcl].queueType === 'RANKED_SOLO_5x5'){
        setTierElo(props.rang[ibcl].tier);
        setDivisionElo(props.rang[ibcl].rank);
        //console.log(props.rang[ibcl].queueType);
      }
    }

  },[props.rang]);

  

  
  
  
  console.log(tierElo);

  return (
    <div>
        <p>{props.nomJoueur}</p>
        <img className='imgElo' src={'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/'+ tierElo.toLowerCase() +'.png'}></img>
        <p>{divisionElo}</p>
        
    </div>
  )
}

export default BarInfoJoueur;
