const router = require('express').Router();
const { debugPort } = require('process');
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id', 'comment_text', 'user_id', 'post_id'
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Post,
        attributes: ['title']
      }
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;