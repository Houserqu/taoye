import React, { Component } from "react"
import logo from "./logo.svg"
import { Button, Row, Col, Select, Card, Modal, message } from "antd"
import data from "./data"
import "./App.css"

const { Option } = Select

class App extends Component {
  state = {
    data,
    resultImg: logo,
    selectArticleIndex: null,
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
    const { selectText, selectArticleIndex } = this.state;
    if (selectArticleIndex >= 0 && selectText) {
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
    } else {
      Modal.error({
        title: '错误',
        content: '请先选择文章和答案！'
      })
    }
  }

  // 生成问题
  handleGenerate = () => {
    const { selectArticleIndex, selectText, data } = this.state
    if (selectArticleIndex >= 0 && selectText) {
      // 匹配答案
      let secondsToGo = 3;
      const modal = Modal.success({
        title: '任务创建成功',
        content: '系统正在生成问题，请稍等',
        iconType: 'loading'
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: '系统正在生成问题，请稍等',
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();


        if (selectText == data[selectArticleIndex].answer) {
          // 成功
          message.success('生成成功')
          this.setState({
            question: {
              title: data[selectArticleIndex].title,
              answer: selectText,
              question: data[selectArticleIndex].question,
              image: data[selectArticleIndex].image
            }
          })
        } else {
          // 失败
          message.error('生成失败')
          this.setState({
            question: {
              title: data[selectArticleIndex].title,
              answer: selectText,
              question: '*****************',
              image: require('./images/none.png')
            }
          })
        }
      }, secondsToGo * 1000);
      
    } else {
      Modal.error({
        title: '错误',
        content: '请先选择文章和答案！'
      })
    }
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
        <header className="App-header" >
          <div>
            <img
              src={resultImg}
              className="App-logo"
              alt=""
            />
          </div>
          <h2 style={{ color: '#FFFFFF' }}>
            基于深度学习的问题生成系统
          </h2>
        </header>
        <div className="container">
          <Row gutter={16}>
            <Col span={14}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={18}>
                  <Select
                    className="article_select"
                    placeholder="请选择要输入的文章"
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
                    {data[selectArticleIndex] && data[selectArticleIndex].content}
                  </Card>
                </Col>
                <Col span={6}>
                  <Card style={{ height: 250 }}>{selectText}</Card>
                </Col>
              </Row>
              <Row style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
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
              {question.image && (
                <img src={question.image} style={{ width: '100%' }} alt="" />
              )}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
