import { useState, useEffect } from 'react'
import { Upload, message, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { connect } from 'dva'
const { Dragger } = Upload;

const index = ({ dispatch, onClose }) => {

  const props = {
    name: 'file',
    multiple: true,
    action: 'http://106.15.88.18/fileupload/v1/api/file/upload_big_file',
    customRequest: async (options) => {
      const { action, file, onSuccess, onError, onProgress } = options
      const createGuid = function () {
        function S4 () {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        }
        return (
          S4() +
          S4() +
          '-' +
          S4() +
          '-' +
          S4() +
          '-' +
          S4() +
          '-' +
          S4() +
          S4() +
          S4()
        )
      }
      fileUpload(options, 0, createGuid())
    },
    onChange (info) {
      const me = this
      const status = info.file.status
      if (status !== 'uploading') {
        // removed
        console.log(info.file, info.fileList)
      }
      if (status === 'removed') {
        me.fileList.forEach(function (item, index) {
          if (item.uid === info.file.uid) {
            me.fileList.splice(index, 1)
          }
        })
      }
      if (status === 'done') {
        console.log(1)
      } else if (status === 'error') {
        console.log(2)
      }
    },
  };

  const fileUpload = (option, chunk, guid) => {
    const file = option.file
    const chunkSize = 1 * 1024 * 1024
    const maxSize = 1024 * 1024 * 600
    const maxChunk = Math.ceil(file.size / chunkSize)
    const formData = new FormData()
    const fileSize = file.size
    if (fileSize > maxSize) {
      this.$message.error('文件大小不能超过' + maxSize / 1024 / 1024 + 'M')
      return
    }

    const currentPercent = Number((chunk / maxChunk) * 100)
    option.onProgress({ percent: currentPercent })
    formData.append(
      'file',
      file.slice(chunk * chunkSize, (chunk + 1) * chunkSize)
    )
    formData.append('name', file.name)
    formData.append('chunk', chunk)
    formData.append('maxChunk', maxChunk)
    formData.append('guid', guid)

    dispatch({
      type: "material/batchUpload",
      payload: formData
    }).then(res => {
      if (!res.completed) {
        fileUpload(option, ++chunk, guid)
      } else {
        message.success('文件上传成功')
        option.onProgress({ percent: 100 })
        option.onSuccess()
      }
    })
  }

  return (
    <Modal title='批量导入'
      width='60%'
      visible={true}
      onCancel={() => onClose()}
      onOk={() => onClose()}
      cancelText="取消"
      okText="确定"
      bodyStyle={{ height: "600px", overflowY: "scroll" }}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
    </Modal>
  )
}

export default connect(({ }) => ({}))(index)