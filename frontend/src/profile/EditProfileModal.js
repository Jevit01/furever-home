
import React from "react";
import Modal from "react-modal";
import { MyContext } from "../provider/MyProvider";
import axios from "axios";
import "../css/profilemodal.css";
import { withRouter } from "react-router-dom";


class ProfileModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      modalIsOpen: false,
      inputProfile_PictureURL: props.oldState.profileUser.profile_picture,
      inputUsername: props.oldState.profileUser.username,


      inputCity: props.oldState.profileUser.city,
      inputState: '',
      inputAboutText: props.oldState.profileUser.about,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // componentDidMount() {
  //   // console.log(this.props);
  //   debugger
  //   this.props.getSingleUser(this.props.match.params.id);
  // }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#2F1847';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    debugger;
    e.preventDefault();
    axios
      .patch(`/users/profile/${this.state.userId}`, {
        username: this.state.inputUsername,
        about: this.state.inputAboutText,
        profile_picture: this.state.inputProfile_PictureURL,
      })
      .then(res => {
        console.log(res.data);
      })
      .then(() => {
        axios.patch(`/users/profile/location/${this.state.userId}`, {
          city: this.state.inputCity,
          state: this.state.inputState,
        });
      })
      .then(() => {
        this.props.getSingleUser();
      });
  };

  render() {
    console.log(this.state);
    return (
      


<MyContext.Consumer>
        {context => {
          return (
            <div>
              <button onClick={this.openModal} className="profileButton">
                Edit Profile
              </button>
              <Modal
                ariaHideApp={false}
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                className="modal_container"
              >
                <div className="modal_close">
                  <button onClick={this.closeModal}>X</button>
                </div>
                <h2
                  ref={subtitle => (this.subtitle = subtitle)}
                  className="modal_title"
                >
                  Edit Profile
                </h2>
                <form

                  onSubmit={this.handleSubmit}

                  id="post_form"
                  className="modal_form"
                >
                  <div className="modal_left">
                    Profile Picture
                    <input
                      type="text"
                      value={this.state.inputProfile_PictureURL}
                      onChange={this.handleChange}
                      placeholder="Photo Url"
                      name="inputProfile_PictureURL"
                    />
                  </div>
                  <div className="modal_right">
                    <label className="modal_label">Username</label>
                    <input
                      type="text"
                      value={this.state.inputUsername}
                      onChange={this.handleChange}
                      placeholder="Username"
                      name="inputUsername"
                      className="modal_input"
                    />
                    <label className="modal_label">City</label>
                    <input
                      type="text"
                      value={this.state.inputCity}
                      onChange={this.handleChange}
                      placeholder="City"
                      name="inputCity"
                      className="modal_input"
                    />
                    <label className="modal_label">State</label>
                    <input
                      type="text"
                      value={this.state.inputState}
                      onChange={this.handleChange}
                      placeholder="State"
                      name="inputState"
                      className="modal_input"
                    />
                    <label className="modal_label">About Me</label>
                    <input
                      type="text"
                      value={this.state.inputAboutText}
                      onChange={this.handleChange}
                      placeholder="About"
                      name="inputAboutText"
                      className="modal_about"
                    />
                    <input
                    type="submit"

                    value="Make Changes"
                    />
                  </div>
                </form>


              </Modal>
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

export default withRouter(ProfileModal);
