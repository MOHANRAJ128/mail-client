import React from "react";
import { requestInboxData } from "../actions/inboxMail.js";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { storeComposeMail } from "../actions/compose.js";
import profile from "./../img/profile.png";

export class Mail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMail: this.props.mail
		};
		this.handleCompose = this.handleCompose.bind(this);
	}

	handleCompose(e) {
		this.props.storeComposeMail(this.props.inboxData);
	}
 
	converttime(time) {
		var data = {"date": "2/24/2018", "time": "6:25:43 PM"};
		
		return data;
	}
	render() {
		let mail_body_id = this.props.mail;
		if (mail_body_id == 0) {
			var mailbody = (
				<div className="emptymail">
					<p>
						<strong>Select a mail to read.</strong>
					</p>
				</div>
			);
		} else {
			var mailbody = (
				<div key={this.props.inboxData.id} className="mailbody">
					<h3>{this.props.inboxData.subject}</h3>
					<hr />
					<div className="profile-from">
						<img src={profile} alt="profile" className="profile" />&nbsp;&nbsp;
						<div>
							<strong>
								{" "}
								<span>{this.props.inboxData.from}</span>
							</strong>
							<br />
							<span>
								<strong>
									{
										this.converttime(
											this.props.inboxData.time
										).date
									}
								</strong>
							</span>&nbsp;
							<span>
								<strong>
									{
										this.converttime(
											this.props.inboxData.time
										).time
									}
								</strong>
							</span>
						</div>
					</div>
					<hr />
					To:{" "}
					<strong>
						<span>{this.props.inboxData.to}</span>
					</strong>
					<hr />
					<div>
						<p>
							<i>{this.props.inboxData.body}</i>
						</p>
						<hr />
					</div>
					<NavLink
						className="composebtn"
						to="/composemail"
						
					>
						<button
							type="submit"
							className={
								"btn-success pull-right composebtn" +
								(this.props.folder == "draft" ? "" : " visible")
							}
							onClick={this.handleCompose()}
						>
							Edit
						</button>
					</NavLink>
				</div>
			);
		}
		return (
			<div>
				{/*<a className="card-link" href="#">&lt;--&nbsp;Reply</a>
          <a className="card-link pull-right" href="#">--&gt; Forward</a>*/}
				<div className="col-lg-4 col-sm-4 col-xs-4 text-alg-center mailbodycontainer">
					<div className="viewMail">{mailbody}</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ storeComposeMail }, dispatch);

export default connect(null, mapDispatchToProps)(Mail);