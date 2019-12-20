import {string} from 'prop-types';

LikeButton.propTypes = {
  mustacheVariable: string,
};

/*
 * TODO: move to separate file if this function proves useful.
 * The long term idea is if we are in an AMP template, then output both forms
 * surrounded by conditionals. If we are not in an AMP template, then return
 * one of the two outputs based on the condition.
 * The bad thing however is both arguments are fully evaluated even if not used.
 * Probably should pass in a function instead to render on demand.
 */
function ifElse({mustacheVariable = null}, contentIfTrue, contentIfFalse) {
  if (true) {
    // TODO
    if (mustacheVariable) {
      return (
        <>
          {`{{#${mustacheVariable}}}`}
          {contentIfTrue}
          {`{{/${mustacheVariable}}}`}
          {`{{^${mustacheVariable}}}`}
          {contentIfFalse}
          {`{{/${mustacheVariable}}}`}
        </>
      );
    } else {
      return contentIfFalse;
    }
  } else {
    if (true) {
      // TODO
      return contentIfTrue;
    } else {
      return contentIfFalse;
    }
  }
}

export default function LikeButton(props) {
  return (
    <div className='travel-results-result-like absolute top-0 right-0'>
      <div className='p1'>
        <label className='travel-like'>
          {ifElse(
            props,
            <input type='checkbox' defaultChecked={true} className='absolute' />,
            <input type='checkbox' defaultChecked={false} className='absolute' />
          )}
          <div className='travel-like-hearts circle inline-block relative'>
            <div className='travel-like-heart-tiny travel-like-heart-solid absolute' />
            <div className='travel-like-heart-tiny travel-like-heart-solid absolute' />
            <div className='travel-like-heart-tiny travel-like-heart-solid absolute' />
            <div className='travel-like-heart travel-like-heart-white absolute mx-auto' />
            <div className='travel-like-heart travel-like-heart-solid absolute mx-auto' />
            <div className='travel-like-heart travel-like-heart-outline absolute mx-auto' />
          </div>
        </label>
      </div>
    </div>
  );
}
