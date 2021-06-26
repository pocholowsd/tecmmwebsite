import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {withGetScreen} from 'react-getscreen'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import YouTube from 'react-youtube';
import MenuCentral from './menuCentral.js'
import LinksFooter from './linksFooter.js'
import './styles/carrera.css'
import Carreras from './carrerasData.js'


class Carrera extends Component{

  constructor(props){
    super(props);
    this.state={
      visible: false,
      portada:null,
      youtube:null,
      campus:null,
      objetivo:null,
      perfilIngresoArray:null,
      perfilEgresoArray:null,
      reticula:null,
      folleto:null,
      planEstudios:null,
    }
  }

  componentWillMount(){

    var carrerasArrayVar = Carreras();
    var carreraPath = this.props.match.params.carreraId
    var self=this;

    carrerasArrayVar.forEach(function(it){
      console.log(it);

      if(it.name == carreraPath){
        self.setState({
          portada:it.portada,
          youtube:it.youtube,
          campus:it.campus,
          objetivo:it.objetivo,
          perfilIngresoArray:it.perfilIngreso,
          perfilEgresoArray:it.perfilEgreso,
          reticula:it.reticula,
          folleto:it.folleto,
          planEstudios:it.planEstudios,
        })
      }else{

      }
    });


  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
      this.setState({ visible: false });
  }

  _onReady(event) {

   event.target.pauseVideo();
 }


  render(){

    const opts = {
      height: '500',
      width: '750',
      playerVars: {
        autoplay: 1
      }
    };


    return(
      <div className="div-principal-carrera">

      <Rodal width="800" height="550" visible={this.state.visible} onClose={this.hide.bind(this)}>
          <div>
            <YouTube
              videoId={this.state.youtube}
              opts={opts}
              onReady={this._onReady}
            />
          </div>
      </Rodal>


          <MenuCentral/>



        <div>

          <img className="img-portadaCarrera" src={this.state.portada}/>

          <div className="div-Carrera">

            <div className="div-infoCarrera">

              <h2 className="h2-objetivo">OBJETIVO GENERAL</h2>
              <p className="p-objetivo">
                {this.state.objetivo}
              </p>


              {this.props.match.params.carreraId=="Maestria-en-Sistemas-Computacionales" || this.props.match.params.carreraId=="Maestria-en-Administracion"?
                <div></div>
            
                :
                <div>
                <h2 className="h2-objetivo">PERFIL DE INGRESO</h2>
                <ol className="perfilIngresoList">

                {this.state.perfilIngresoArray.map((it)=>(
                  <li>
                    <p>{it.perfil}</p>
                  </li>

                ))}

                </ol>
                </div>
              }

              


              <h2 className="h2-objetivo">PERFIL DE EGRESO</h2>
              <ul className="perfilEgresoList">

              {this.state.perfilEgresoArray.map((it)=>(
                <li>
                  <p>{it.perfil}</p>
                </li>

              ))}

              </ul>

              <h2 className="h2-objetivo"> OFERTADA EN LOS CAMPUS </h2>
              <p className="p-campus">
                {this.state.campus}
              </p>

            </div>

            <div className="div-botonesCarrera">
              
              {this.props.match.params.carreraId=="Maestria-en-Sistemas-Computacionales"?
                <a href="http://zapopan.tecmm.edu.mx/nuevoIngresoZapopan" target="_blank">
                  <button>PROCESO DE INSCRIPCIÓN</button>
                </a>

              :this.props.match.params.carreraId=="Maestria-en-Administracion"?
              <a href="http://vallarta.tecmm.edu.mx/inscripcionMaestria" target="_blank">
                <button>PROCESO DE INSCRIPCIÓN</button>
              </a>
              :
                <a href="http://tecmm.edu.mx/nuevoIngreso" target="_blank">
                  <button>PROCESO DE INSCRIPCIÓN</button>
                </a>
              }
              


              <a href="http://edcore.tecmm.edu.mx" target="_blank">
                <button> INSCRÍBETE</button>
              </a>


              <button onClick={this.show.bind(this)}>VIDEO</button>


              <a href={this.state.reticula} target="_blank">
                <button>RETÍCULA</button>
              </a>

              <a href={this.state.planEstudios} target="_blank">
                <button>PLAN DE ESTUDIOS</button>
              </a>

              <Link to={'/Contacto'}>
                <button>CONTACTANOS</button>
              </Link>

              <a href={this.state.folleto} target="_blank">
                <button>FOLLETO</button>
              </a>

            </div>

          </div>

        </div>

        <LinksFooter/>

      </div>
    );
  }
}

const options = {mobileLimit: 420, tabletLimit: 770}
export default withGetScreen(Carrera, options);
