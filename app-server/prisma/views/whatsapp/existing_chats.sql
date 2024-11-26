SELECT
  DISTINCT `m`.`userId` AS `firstUser`,
  `m`.`chatId` AS `chatId`,
  `m1`.`userId` AS `secondUser`
FROM
  (
    `whatsapp`.`userchatmapping` `m`
    LEFT JOIN `whatsapp`.`userchatmapping` `m1` ON(
      (
        (`m1`.`chatId` = `m`.`chatId`)
        AND (`m1`.`userId` <> `m`.`userId`)
      )
    )
  )