import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("grawnya@gmail.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Gráinne").required(),
  lastName: Joi.string().example("O'Connor").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const ResultSpec = Joi.object()
  .keys({
    distance: Joi.number().required().example(6),
    duration: Joi.number().required().example(40),
    date: Joi.string().required().example("14/03/2025"),
    trailid: IdSpec,
  })
  .label("Result");

export const ResultSpecPlus = ResultSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ResultPlus");

export const ResultArraySpec = Joi.array().items(ResultSpecPlus).label("ResultArray");

export const TrailSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Blackrock Greenway"),
    location: Joi.string().required().example("Cork"),
    userid: IdSpec,
    results: ResultArraySpec,
  })
  .label("Trail");

export const TrailSpecPlus = TrailSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrailPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArray");

