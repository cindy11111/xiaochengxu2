  /**
 * 从本地相册选择图片或使用相机拍照。
 * @param {number} count 最多可选图片的数量
 * @param {array} sizeType original 原图，compressed 压缩图
 * @param {array} sourceType album 从相册选图，camera 使用相机
 */
  function chooseImage(count = 1, sizeType = ['compressed'], sourceType = ['album', 'camera']) {
    return new Promise((resolve, reject) => wx.chooseImage({ count, sizeType, sourceType, success: resolve, fail: reject }));
  }
  /**
   * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
   * @param {boolean} compressed 是否压缩
   * @param {array} sourceType album 从相册选图，camera 使用相机
   * @param {number} maxDuration 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
   */
function chooseVideo(compressed = true, sourceType = ['album', 'camera'], maxDuration = 60) {
    return new Promise((resolve, reject) => wx.chooseVideo({ sourceType, compressed, maxDuration, success: resolve, fail: reject }));
  }
 
  /**
 * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求
 * @param {string} url 开发者服务器 url
 * @param {string} filePath 要上传文件资源的路径
 * @param {string} name 
 * @param {object} formData HTTP 请求中其他额外的 form data
 */
function uploadFile(url, filePath, name, formData = { openid: "test" }) {
    return new Promise((resolve, reject) => {
      let opts = { url, filePath, name, formData, header: { 'Content-Type': "multipart/form-data" }, success: resolve, fail: reject };
      wx.uploadFile(opts);
    });
  }
  module.exports = {
    chooseImage: chooseImage,
    chooseVideo: chooseVideo,
    uploadFile: uploadFile
  }



//  引用的js中写法如下

  // let app = getApp();
  // let wechat = require("../../utils/wechat");
  // Page({
  //   data: {
  //     tempImagePath: "", // 拍照的临时图片地址
  //     tempThumbPath: "", // 录制视频的临时缩略图地址
  //     tempVideoPath: "", // 录制视频的临时视频地址
  //     type: "chooseImage",
  //   },
  //   onLoad() {
  //   },
  //   camera(e) {
  //     let { type } = e.target.dataset;
  //     this.setData({
  //       type
  //     })
  //     console.log("开始上传准备", type == "chooseImage" ? "图片" : "视频");
  //     // 拍照
  //     if (type == "chooseImage") {
  //       console.log("选择图片");
  //       wechat.chooseImage()
  //         .then(d => {
  //           let { path, size } = d.tempFiles[0];
  //           this.setData({
  //             tempImagePath: path,
  //           });
  //           return wechat.uploadFile("https://xx.xxxxxx.cn/api/upload", path, "uploadImg")
  //         })
  //         .then(d => {
  //           console.log(d);
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         })
  //     }
  //     // 录视频
  //     else if (type == "chooseVideo") {
  //       wechat.chooseVideo()
  //         .then(d => {
  //           console.log(d);
  //           let { tempFilePath, thumbTempFilePath, size } = d;
  //           this.setData({
  //             // tempThumbPath: thumbTempFilePath,
  //             tempVideoPath: tempFilePath,
  //           });
  //           return wechat.uploadFile("https://xx.xxxxxx.cn/api/upload", tempFilePath, "tempVideoPath");
  //         })
  //         .then(d => {
  //           console.log(d);
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         })
  //     }
  //   }
  // })

