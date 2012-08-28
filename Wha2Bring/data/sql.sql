SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `partymgr` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `partymgr` ;

-- -----------------------------------------------------
-- Table `partymgr`.`User`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `partymgr`.`User` (
  `id_user` INT NOT NULL AUTO_INCREMENT ,
  `id_facebook` VARCHAR(20) NOT NULL ,
  `vc_first_name` VARCHAR(30) NOT NULL ,
  `vc_last_name` VARCHAR(45) NOT NULL ,
  `vc_location` VARCHAR(30) NOT NULL ,
  `c_gender` CHAR NOT NULL ,
  `vc_mail` VARCHAR(50) NOT NULL ,
  PRIMARY KEY (`id_user`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `partymgr`.`Event_by_user`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `partymgr`.`Event_by_user` (
  `id_event` INT NOT NULL AUTO_INCREMENT ,
  `id_user` INT NOT NULL ,
  `vc_name` VARCHAR(200) NOT NULL ,
  `t_description` TEXT NULL ,
  `dt_start_date` DATETIME NOT NULL ,
  `dt_end_date` DATETIME NULL ,
  `vc_location` VARCHAR(30) NULL ,
  `vc_privacy` VARCHAR(45) NULL ,
  `vc_type` VARCHAR(30) NULL ,
  `id_custom_table` INT NULL ,
  `id_facebook_event` TEXT NOT NULL ,
  PRIMARY KEY (`id_event`) ,
  INDEX `id_user_fk_idx` (`id_user` ASC) ,
  CONSTRAINT `id_user_fk`
    FOREIGN KEY (`id_user` )
    REFERENCES `partymgr`.`User` (`id_user` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `partymgr`.`Item`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `partymgr`.`Item` (
  `id_item` INT NOT NULL AUTO_INCREMENT ,
  `vc_img` VARCHAR(25) NOT NULL ,
  `vc_name` VARCHAR(100) NOT NULL ,
  `vc_type` VARCHAR(50) NULL ,
  PRIMARY KEY (`id_item`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `partymgr`.`Event_friend`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `partymgr`.`Event_friend` (
  `id_event_friend` INT NOT NULL ,
  `id_event` INT NOT NULL ,
  `id_user_friend` INT NOT NULL ,
  `id_item` INT NOT NULL ,
  `d_amount` DECIMAL(5) NOT NULL ,
  `b_confirmed` TINYINT(1) NULL ,
  PRIMARY KEY (`id_event_friend`) ,
  INDEX `id_event_idx` (`id_event` ASC) ,
  INDEX `id_item_fk_idx` (`id_item` ASC) ,
  CONSTRAINT `id_event_fk`
    FOREIGN KEY (`id_event` )
    REFERENCES `partymgr`.`Event_by_user` (`id_event` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_item_fk`
    FOREIGN KEY (`id_item` )
    REFERENCES `partymgr`.`Item` (`id_item` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `partymgr`.`Event_comment`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `partymgr`.`Event_comment` (
  `id_comment` INT NOT NULL ,
  `id_event` INT NOT NULL ,
  `id_user_friend` INT NOT NULL ,
  `t_comment` TEXT NOT NULL ,
  PRIMARY KEY (`id_comment`) ,
  INDEX `id_event_fk_idx` (`id_event` ASC) ,
  CONSTRAINT `id_event_comment_fk`
    FOREIGN KEY (`id_event` )
    REFERENCES `partymgr`.`Event_by_user` (`id_event` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
