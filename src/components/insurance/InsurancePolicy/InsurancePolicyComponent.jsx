import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from '../AuthenticationService';
import InsurancePolicyDataService from '../../../api/insurance/InsurancePolicyDataService';
import { Col, Row, Button, ButtonGroup } from "react-bootstrap";

class InsurancePolicyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        InsurancePolicyDataService.retrieveInsurancePolicy(username, this.state.id)
            .then(response => this.setState({
                //description: response.data.description,
                //targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id,
            idClient: values.idCliente,
            idSellAgent: values.idSellAgent,
            idType: values.idType,
            idStatus: values.idStatus,
            period: values.period,
            value: values.Value,
            deductible: values.Deductible,
            coverageAmount: values.CoverageAmount,
            coverageStart: values.CoverageStartDate,
            coveragePeriod: values.CoveragePeriod,
            monthlyFee: values.MonthlyFee,
            comission: values.Comission,
            active: values.Active



        }

        if (this.state.id === -1) {
            InsurancePolicyDataService.createinsurancePolicy(todo)
                .then(() => this.props.history.push('/insurancePolicy'))
        } else {
            InsurancePolicyDataService.updateinsurancePolicy(username, this.state.id, todo)
                .then(() => this.props.history.push('/todos'))
        }

        console.log(values);
    }

    render() {

        let { idClient, idSellAgent, idType, period, value, deductible, coverageAmount, coverageStart, coveragePeriod, monthlyFee, comission, active } = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                    <h1>Insurance Policy</h1>
                    <div className="container">
                        <Formik
                            initialValues={{ idClient, idSellAgent, idType, period, value, deductible, coverageAmount, coverageStart, coveragePeriod, monthlyFee, comission, active }}
                            onSubmit={this.onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={this.validate}
                            enableReinitialize={true}
                        >
                            {
                                (props) => (
                                    <Form>
                                        <div className="container bg-light">
                                            <fieldset className="form-group">
                                                <label>Id Client</label>
                                                <Field className="form-control" type="number" name="idClient" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Id Sell agent</label>
                                                <Field className="form-control" type="number" name="idSellAgent" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Id Type</label>
                                                <Field className="form-control" type="number" name="idType" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Id Status</label>
                                                <Field className="form-control" type="number" name="idStatus" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Period</label>
                                                <Field className="form-control" type="text" name="Period" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Value</label>
                                                <Field className="form-control" type="number" name="Value" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Deductible</label>
                                                <Field className="form-control" type="number" name="Deductible" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Coverage Amount</label>
                                                <Field className="form-control" type="number" name="CoverageAmount" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Coverage Amount Date</label>
                                                <Field className="form-control" type="date" name="CoverageStartDate" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Coverage Period</label>
                                                <Field className="form-control" type="number" name="CoveragePeriod" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Monthly fee</label>
                                                <Field className="form-control" type="number" name="MonthlyFee" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Comission</label>
                                                <Field className="form-control" type="number" name="Comission" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Active</label>
                                                <div className="bg-light">

                                                    <Field type="radio" name="txtActive" value="true" />
                                                    <label>Active</label>
                                                    <br />
                                                    <Field type="radio" name="txtActive" value="false" />
                                                    <label>Inactive</label>
                                                </div>
                                            </fieldset>
                                            <br />
                                        </div>
                                        <button className="btn btn-success" type="submit">Save</button>

                                    </Form>
                                )
                            }
                        </Formik>

                    </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InsurancePolicyComponent