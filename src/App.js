import React, { Component } from "react"
import logo from "./logo.svg"
import { Button, Row, Col, Select, Card, Modal } from "antd"
import data from "./data"
import "./App.css"

const { Option } = Select

class App extends Component {
  state = {
    data,
    resultImg: logo,
    selectArticleIndex: 0,
    selectText: "", // 选择的文本
    question: {
      // 生成的问题
      title: "",
      answer: "",
      question: "",
      image: null
    }
  }

  componentDidMount() {
    this.listenMouseSelect("article")
  }

  listenMouseSelect = id => {
    var oContent = document.getElementById(id)
    oContent.onmouseup = () => {
      this.setState({ selectText: window.getSelection().toString() })
    }
  }

  handleSelectArticle = v => {
    this.setState({
      selectArticleIndex: v
    })
  }

  addAnswer = () => {
    const { selectText } = this.state
    Modal.confirm({
      title: "添加答案",
      content: (
        <p>
          你选择的答案为:
          <br />
          <b>{selectText}</b>
        </p>
      )
    })
  }

  handleGenerate = () => {
    const { selectArticleIndex, selectText } = this.state
    this.setState({
      question: {
        title: data[selectArticleIndex].title,
        answer: selectText,
        question: data[selectArticleIndex].question,
        image: data[selectArticleIndex].image
      }
    })
  }

  render() {
    const {
      resultImg,
      data,
      selectArticleIndex,
      selectText,
      question
    } = this.state
    return (
      <div className="App">
        <header className="App-header" />
        <div className="container">
          <Row gutter={16}>
            <Col span={14}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={18}>
                  <Select
                    className="article_select"
                    defaultValue={0}
                    placeholder="请选择文章"
                    onChange={this.handleSelectArticle}>
                    {data.map((v, i) => (
                      <Option value={i} key={v.i}>
                        {v.title}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    style={{ width: "100%" }}
                    onClick={this.addAnswer}>
                    答案
                  </Button>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={18}>
                  <Card style={{ height: 250 }} id="article">
                    {data[selectArticleIndex].content}
                  </Card>
                </Col>
                <Col span={6}>
                  <Card style={{ height: 250 }}>{selectText}</Card>
                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Button
                  type="danger"
                  style={{ width: "100%" }}
                  onClick={this.handleGenerate}>
                  运行系统生成问题
                </Button>
              </Row>
              <Row>
                <Card title={`文章: ${question.title}`}>
                  <p>
                    <b>答案：</b> {question.answer}
                  </p>
                  <p>
                    <b>问题：</b> {question.question}
                  </p>
                </Card>
              </Row>
            </Col>
            <Col span={10}>
              {question.image ? (
                <img src={question.image} style={{ width: '100%' }} alt="" />
              ) : (
                <img
                  src={question.image || resultImg}
                  className="App-logo"
                  alt=""
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
