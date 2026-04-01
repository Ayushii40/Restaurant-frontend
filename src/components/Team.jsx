import React from 'react'
import { data } from '../restApi.json'

const Team = () => {
  return (
    <section className='team' id='team'>
       <div className="container">
        <div className="heading_section">
          <h1 className='heading'>OUR TEAM</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure cupiditate sequi aliquam iusto earum quia aut. Aspernatur rerum quidem nisi aperiam magnam, eaque molestiae aut eius, blanditiis voluptas ex necessitatibus!
          Rerum dolorem nihil porro optio quas ut numquam, obcaecati, esse voluptates atque laborum reprehenderit deleniti quibusdam iste ipsum neque alias at dolores reiciendis! Dolore aspernatur ipsum tempora cum eligendi eaque?
          Laboriosam, sequi? Tempora, vel dolor. Earum, voluptatibus quo tempore optio repellat ab molestiae? Minus veritatis consectetur tenetur minima voluptatibus placeat amet ex hic modi, earum nam, officiis dignissimos mollitia expedita?
          </p>
        </div>
        <div className="team_container">
          {
            data[0].team.map(element=>{
              return(
                <div className="card" key={element.id}>
                  <img src={element.image} alt={element.name} />
                  <h3>{element.name}</h3>
                  <p>{element.designation}</p>
                </div>
              )
            })
          }
        </div>
       </div>
    </section>
  )
}

export default Team
