package services

import play.api.libs.json._
import javax.inject._

/* Add an Enum or something so it can only be a defined val*/
class Resource @Inject()(_name: String) {
  val name = _name

  val convToJson = new Writes[Resource] {
    def writes(res : Resource) = Json.obj(
      "name" -> res.name
    )
  }
}
