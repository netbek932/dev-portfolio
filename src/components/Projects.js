import React, { Component } from "react";
import ReactPlayer from "react-player";
import { X } from 'react-bootstrap-icons';
import Ecodrive from '../ecodrive-demo.mp4';
import Atelier from '../atelier-demo.mov';
import Namib from '../p1.jpg';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
      demoModalShow: false,
      selectedDemo: ''
    };
  }

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };
    const demoModalShow = (demo) => {
      let current = '';
      if (demo === 'ecodrive-demo.mp4') {
        current = Ecodrive
      } else {
        current = Atelier
      }
      this.setState({ demoModalShow: true, selectedDemo: current})
    }
    const demoModalClose = () => {
      this.setState({demoModalShow: false})
    }

    const selectedDemo = this.state.selectedDemo;
    const showModal = this.state.demoModalShow;

    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      var projects = this.props.resumeProjects.map(function (projects) {
        if (projects.technologies) {
          const technologies = projects.technologies;
          const images = projects.images;
          var tech = technologies.map((icons, i) => {
            return (
              <li className="list-inline-item mx-3" key={i}>
                <span>
                  <div className="text-center">
                    <i className={icons.class} style={{ fontSize: "300%" }}>
                      <p className="text-center" style={{ fontSize: "30%" }}>
                        {icons.name}
                      </p>
                    </i>
                  </div>
                </span>
              </li>
            );
          });
          if (projects.images) {
            var img = images.map((elem, i) => {
              return <div key={i} data-src={elem} />;
            });
          }
        }

        if (showModal) {
          return (
            <div className="demo-modal" onClick={() => demoModalClose()}>
              <ReactPlayer
                  className="react-player-modal"
                  url={selectedDemo}
                  width='100%'
                  height='100%'
                  controls={false} muted={true} playing={true} >
                </ReactPlayer>
                <div className="close-modal" onClick={() => demoModalClose()}> <X size={50} /> </div>
              </div>
          )
        }

        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={projects.title}
            style={{ cursor: "pointer" }}
          >
            <span className="portfolio-item d-block">
              <div className="foto" onClick={() => detailsModalShow(projects)}>
                <div className="player-wrapper">
                  {projects.demo !== ''
                  ?
                  <ReactPlayer onClick={() => demoModalShow(projects.demo)}
                  className="react-player"
                  // url={projects.demo}
                  url={projects.demo === 'ecodrive-demo.mp4' ? Ecodrive : Atelier }
                  width={'400px'}
                  height={'500px'}
                  controls={false} muted={true} playing={true} >
                  </ReactPlayer>
                  :
                  <div className="react-player" width={'400px'} height={'500px'}>
                    <img
                      // src={projects.images[0]}
                      src={Namib}
                      alt="projectImages"
                      width={'450px'} height={'335px'}
                      style={{marginBottom: 0, paddingBottom: 0, position: 'relative' }}
                    />
                  </div>
                  }
                  <br />
                  <span className="project-date">{projects.startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">
                    {projects.title}
                    {projects.url ? (
                <a
                  href={projects.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-href"
                >
                  <i
                    className="fas fa-external-link-alt"
                    style={{ marginLeft: "10px" }}
                  ></i>
                </a>
              ) : null}
                  </p>
                    <p >{projects.description}</p>

                      <ul className="list-inline mx-auto">{tech}</ul>
                </div>
              </div>
            </span>
          </div>
        );
      });
    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
          {/* <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          /> */}
        </div>
      </section>
    );
  }
}

export default Projects;
