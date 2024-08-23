export default function MedicationItem({ name, description, image }) {
  return <div style={{width: '300px', background: 'lightgray'}}>
           <img src={image} width="50px"/>
           <h1>{name}</h1>
           <p>{description}</p>
         </div>
}