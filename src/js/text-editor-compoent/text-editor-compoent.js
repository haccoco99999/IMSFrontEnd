
import React from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {connect} from 'react-redux'
import './text-editor-compoent.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
class TextEditor extends React.Component{
    constructor(props){
        super(props)
        const html = this.props.mailDescription;
        const contentBlock = htmlToDraft(html)
        if(contentBlock){
            
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state = {
                editorState,
            }
            
            console.log(this.state.editorState.getCurrentContent())
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
       
    }
    onEditorStateChange(editorState){
        this.setState({
            editorState,
        })
    }
    componentWillReceiveProps(){
        if(!this.props.controlPurchaseQuotePage.isClickToPreviewPriceQuote){
            
            this.props.changeMailContent(this.state.editorState)
        }
    }
    // draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    render(){
        const { editorState } = this.state;
        return(
            <div>
              
            <Editor
 
            editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: ['history','fontFamily','fontSize' ,'inline','textAlign','list'  ],
                textAlign:{
                    options:['left', 'center', 'right']
                },
                inline:{
                  options: ['bold', 'italic', 'underline']
                },
               list:{
                options: ['unordered']
               },
               
                link: { inDropdown: true },
                }}
              onEditorStateChange={this.onEditorStateChange}
                
            />
            {/* draftToHtml(convertToRaw(editorState.getCurrentContent())) */}
            {/* {this.props.controlPurchaseQuotePage.isClickToSendMailPriceQuote?() =>this.props.changeMailContent("abc"):""} */}
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    controlPurchaseQuotePage: state.controlPurchaseQuotePage,
})

const connected = connect(mapStateToProps)(TextEditor)
export default connected