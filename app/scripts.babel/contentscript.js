'use strict';

let requestToken = ''
let accessToken = ''

function setMarkIcons() {
  $('.queue_list .item').each(function (id, item) {
    const itemLink = $(this).find('.item_link')
    const markIcon = chrome.extension.getURL('images/mark-icon.svg');
    const iconStyle = `position: absolute; top: 7px; left: 7px; width: 33px; cursor: default; box-shadow: 0px 0px 3px #fff; border-radius: 50%;`

    $(itemLink).append(`<img class="mark_read_icon" style="${iconStyle}" src="${markIcon}" title="mark done" />`)

  })

  $('.mark_read_icon').on('click', function(e) {
    e.stopPropagation()
    e.preventDefault()

    const itemID = $(this).closest('.item').attr('id').substring(1)
    // console.log(requestToken , accessToken , itemID )
    addReadTag(itemID, accessToken)
  })
}

$(document).ready(() => {
    getRequestToken().then(({code: requestTokenCode}) => {
      getAccessToken(requestTokenCode).then(({code: accessTokenCode}) => {

        requestToken = requestTokenCode
        accessToken = accessTokenCode
        setTimeout(setMarkIcons, 1000)

      })
    })
})