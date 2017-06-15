'use strict';

const requestToken = '7f68193f-256d-faf1-ed8d-c10b5c'
const accessToken = 'd6756445-3bb1-648e-6b3b-b2b18a'
let itemsCount = 0

const recalcItemsCount = () => itemsCount = $('.queue_list li').length

function findMarkDoneTag(container) {
  let issetDone = false

  $(container).find('.tag').each((id, item) => {
    if(issetDone) return
    issetDone = $(item).text() === 'done!!!'
  })

  return issetDone
}

function setMarkIcons() {
  $('.queue_list .item').each(function (id, item) {

    const tagsWrap = $(item).find('.tags.hasTags')

    if( tagsWrap.length ) {
       if( findMarkDoneTag( $(tagsWrap).find('.tag_container') ) ) {
          $(item).remove()
       }
    }

    const itemLink = $(this).find('.item_link')
    const markIcon = chrome.extension.getURL('images/mark-icon.svg');
    const iconStyle = `position: absolute; top: 7px; left: 7px; width: 33px; cursor: default; box-shadow: 0px 0px 3px #fff; border-radius: 50%;`

    $(itemLink).append(`<img class="mark_read_icon" style="${iconStyle}" src="${markIcon}" title="mark done" />`)
  })

  recalcItemsCount()

  $('.mark_read_icon').on('click', function(e) {
    e.stopPropagation()
    e.preventDefault()

    const itemID = $(this).closest('.item').attr('id').substring(1)
    addReadTag(itemID, accessToken).then(data => {
        if(data.action_results[0]) {
          $(`li[id="i${itemID}"]`).remove()
          recalcItemsCount()
        }
    })
  })


  let date = 0
  $(window).on('scroll', () => {

    let diff = Date.now() - date
    if( diff < 700 ) return

    date = Date.now()

    if( $('.queue_list li').length > itemsCount ) {
      setMarkIcons()
    }
  })
}

$(document).ready(() => {
    // getRequestToken().then(({code: requestTokenCode}) => {})
    // getAccessToken(requestTokenCode).then(({code: accessTokenCode}) => {
    //
    //   requestToken = requestTokenCode
    //   accessToken = accessTokenCode
    //   setTimeout(setMarkIcons, 1000)
    //
    // })

    setTimeout(setMarkIcons, 1000)
})