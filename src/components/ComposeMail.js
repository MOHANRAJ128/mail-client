import React from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { storeSentMail } from "../actions/sentMail.js";
import { storeDraftMail, deleteDraftMail } from "../actions/draft.js";

export class ComposeMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      from: "user@tcs.com",
      to: "",
      subject: "",
      time: "",
      body: "",
      error: false,
      valid: false
    };
    this.invisible=true;
    this.submitValidation = this.submitValidation.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
  }

  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ error: false });
    if (this.state.to !== "" && this.validateEmail(this.state.to)) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  }
  validateEmail(email) {
    // var re
    // return re.test(String(email).toLowerCase());
    return false;
  }

  submitValidation() {
    if (this.state.to !== "" && this.validateEmail(this.state.to)) {
      this.handleOnSubmit(this.state);
      
    } else {
      this.setState({ valid: false });
    }
  }

  handleOnSubmit(composeData) {
    this.props.storeSentMail(composeData);
    if (this.props.compose.data.id) {
      console.log("delete draft");
      this.props.deleteDraftMail(this.props.compose.data.id);
    }
  }

  handleOnSave(composeData) {
    this.props.storeDraftMail(composeData);
  }

  componentDidMount() {
    this.setState({ id: this.props.compose.data.id });
    this.setState({ from: this.props.compose.data.from });
    this.setState({ to: this.props.compose.data.to });
    this.setState({ subject: this.props.compose.data.subject });
    this.setState({ time: this.props.compose.data.time });
    this.setState({ body: this.props.compose.data.body });
    if (
      this.props.compose.data.to !== "" &&
      this.validateEmail(this.props.compose.data.to)
    ) {
      this.setState({ valid: true });
    }
  }

  render() {
    

    return (
      <div>
        <div className="blur_background" />
        <div className="popup_inner">
          <div className="composemail">
            <form autocomplete="off">
              <div>
                <input type="text"/>
              </div>
              <br />
              <div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject.."
                  onChange={this.handleOnChange.bind(this)}
                  value={this.state.subject}
                />

              </div>
              <br />
              <div>
               <textarea></textarea>
              </div>
              <br />
            </form>
            <div>
              <div>
                <NavLink to="/inbox">
                  <button className="closemail">x</button>
                </NavLink>
              </div>

              <NavLink
                className="composebtn"
                onClick={()=>this.submitValidation()}
                to={this.state.valid ? "/sent" : "/composemail"}
              >
                <button
                  type="submit"
                  className="btn-success pull-right composebtn"
                  onClick={()=>this.submitValidation.bind(this)}
                >
                  Send
                </button>
              </NavLink>

              <NavLink
                className="composebtn "
                to="/draft"
              
              >
                <button
                  type="submit"
                  className="btn-success pull-middle composebtn"
                  onClick={this.handleOnSave()}
                >
                  Save
                </button>
              </NavLink>
            </div>
            <br />
            <span className="invisible">
            {/* <span className={"error" + (this.state.error ? this.invisible : this.invisible)}> */}
              All fields are required
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  compose: state.compose
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { storeSentMail, storeDraftMail, deleteDraftMail },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ComposeMail);