import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {connect} from 'react-redux'
import './text-editor-compoent.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
 export default function TextEditor(props) {
    // console.log({...EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("html").contentBlocks))})
  
    const [editorState, setEditorState] = useState( EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("html").contentBlocks)))
    useEffect(()=>{

       
        if(props.setDefault){
   
        const html = props.contentEmail
        const contentBlock = htmlToDraft(html)
      
            
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
           
            setEditorState(
                EditorState.createWithContent(contentState)
            )
            
            }

    
    },[props.contentEmail])

     console.log(editorState)
    
    
  function  onEditorStateChange(editorState){
      
        props.changeMailContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        setEditorState(
            editorState
        )
    }

    // draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    
     
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
              onEditorStateChange={onEditorStateChange}
                
            />
            {/* draftToHtml(convertToRaw(editorState.getCurrentContent())) */}
            {/* {props.controlPurchaseQuotePage.isClickToSendMailPriceQuote?() =>props.changeMailContent("abc"):""} */}
            </div>
        );
    
   
}

// const mapStateToProps = state => ({
//     controlPurchaseQuotePage: state.controlPurchaseQuotePage,
// })

// const connected = connect(mapStateToProps)(TextEditor)
// export default connected